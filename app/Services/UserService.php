<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function store(array $data)
    {
        $user = User::create($data);
        return $user;
    }

    public function update(array $data, User $user)
    {
        $user->update($data);
        return $user;
    }

    public function index($request)
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
    }
}