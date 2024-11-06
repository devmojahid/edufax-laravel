<?php

namespace App\Support;

use App\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements RepositoryInterface
{
    protected Model $model;
    protected array $with = [];

    public function __construct()
    {
        $this->model = $this->makeModel();
    }

    abstract protected function model(): string;

    protected function makeModel(): Model
    {
        $model = app($this->model());
        return $model;
    }

    public function all()
    {
        return $this->model->with($this->with)->get();
    }

    public function find(int $id)
    {
        return $this->model->with($this->with)->findOrFail($id);
    }

    public function findByField(string $field, mixed $value)
    {
        return $this->model->with($this->with)->where($field, $value)->get();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $record = $this->find($id);
        $record->update($data);
        return $record;
    }

    public function delete(int $id)
    {
        return $this->find($id)->delete();
    }

    public function with(array $relations)
    {
        $this->with = $relations;
        return $this;
    }
}
