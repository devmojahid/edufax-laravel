<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Barryvdh\DomPDF\Facade\Pdf;

final class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::query();

        // Handle search
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function (Builder $query) use ($searchTerm) {
                $query->where('title', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%")
                    ->orWhere('price', 'like', "%{$searchTerm}%")
                    ->orWhere('status', 'like', "%{$searchTerm}%");
            });
        }

        // Handle sorting
        if ($request->filled(['sort', 'direction'])) {
            $query->orderBy($request->sort, $request->direction);
        }

        // Handle filters
        if ($request->filled('filters') && is_array($request->filters)) {
            foreach ($request->filters as $field => $value) {
                if (is_array($value)) {
                    $query->whereIn($field, $value);
                } else {
                    $query->where($field, $value);
                }
            }
        }

        // Get paginated results with proper page size
        $perPage = max(1, min((int) $request->input('per_page', 10), 100)); // Limit between 1 and 100
        $page = max(1, (int) $request->input('page', 1));

        $products = $query->paginate($perPage, ['*'], 'page', $page);

        // Store the per_page value in session for persistence
        session(['products_per_page' => $perPage]);

        return Inertia::render('Drafts/product-list', [
            'products' => [
                'data' => $products->items(),
                'meta' => [
                    'total' => $products->total(),
                    'per_page' => $products->perPage(),
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'from' => $products->firstItem(),
                    'to' => $products->lastItem(),
                ],
            ],
            'filters' => [
                'search' => $request->search,
                'sort' => $request->sort,
                'direction' => $request->direction,
                'filters' => $request->filters,
                'page' => $page,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function export()
    {
        $products = Product::all();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Add headers
        $sheet->setCellValue('A1', 'Title');
        $sheet->setCellValue('B1', 'Price');
        $sheet->setCellValue('C1', 'Status');

        // Add data
        $row = 2;
        foreach ($products as $product) {
            $sheet->setCellValue('A' . $row, $product->title);
            $sheet->setCellValue('B' . $row, $product->price);
            $sheet->setCellValue('C' . $row, $product->status);
            $row++;
        }

        $writer = new Xlsx($spreadsheet);

        $response = Response::stream(function () use ($writer) {
            $writer->save('php://output');
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="products.xlsx"',
        ]);

        return $response;
    }

    public function exportPDF()
    {
        $products = Product::all();
        $pdf = PDF::loadView('exports.products', compact('products'));

        return $pdf->download('products.pdf');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv',
        ]);

        $file = $request->file('file');

        // Process the file and import data
        // Add your import logic here

        return back()->with('success', 'Products imported successfully.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:products,id',
        ]);

        try {
            DB::beginTransaction();

            Product::whereIn('id', $request->ids)->delete();

            DB::commit();

            return response()->json([
                'message' => count($request->ids) . ' items deleted successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to delete items'
            ], 500);
        }
    }
}
