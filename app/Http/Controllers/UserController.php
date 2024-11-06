<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use App\Traits\ResponseMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    use ResponseMessage;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('filter') && $request->has('filter_field')) {
            $query->where($request->input('filter_field'), 'like', '%' . $request->input('filter') . '%');
        }

        if ($request->has('sort_by') && $request->has('sort_direction')) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_direction'));
        }

        if ($request->has('trashed') && $request->input('trashed') == 'with') {
            $query->withTrashed();
        }

        if ($request->has('trashed') && $request->input('trashed') == 'only') {
            $query->onlyTrashed();
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        // Paginate results
        $users = $query->paginate($request->input('per_page', 10));


        return Inertia::render('Backend/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['filter', 'filter_field', 'sort_by', 'sort_direction', 'trashed', 'status', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Backend/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request, UserService $userService)
    {
        $userService->store($request->validated());

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Backend/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUserRequest $request, User $user, UserService $userService)
    {
        $userService->update($request->validated(), $user);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
}
