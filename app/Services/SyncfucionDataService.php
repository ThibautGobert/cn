<?php


namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class SyncfucionDataService
{
    /**
     * @param Request $request
     * @param Builder|QueryBuilder $query
     * @param null $defaultOrderBy
     * @param null $defaultDirection
     * @param array $ambiguousFields pour éviter les colonnes "ambiguous" ex vehicule_id =>  ['vehicule_id' => 'm.vehicule_id']
     * @return array
     */
    public static function search(Request $request, Builder|QueryBuilder $query, $defaultOrderBy = null, $defaultDirection=null, array $ambiguousFields = [])
    {
        if($request->has('search')) {
            foreach ($request->input('search') as $search) {
                $query->where(function ($q)use($search, $ambiguousFields) {
                    foreach ($search['fields'] as $field) {
                        $param['field'] = $field;
                        $param['operator'] = $search['operator'];
                        $param['value'] = $search['key'];
                        self::setOrWhereQueryOperator($param, $q, $ambiguousFields);
                    }
                });
            }
        }
        if($request->has('where') ) {
            $wheres = $request->input('where');
            foreach ($wheres as $where) {
                if(isset($where['predicates']))
                    self::handlePredicates($where['predicates'], $where['condition'], $query, $ambiguousFields);
                else
                    self::setWhereQueryOperator($where, $query, $ambiguousFields);
            }
        }
        $count = $query->count();

        if($request->has('skip') && $query->count() > $request->input('take')) {
            $query->skip($request->input('skip'));
        }
        if($request->has('take')) {
            $query->take($request->input('take'));
        }
        if($request->has('sorted')) {
            foreach ($request->input('sorted') as $sort) {
                switch($sort['direction']) {
                    case 'ascending' :
                        $query->orderBy($sort['name']);
                        break;
                    case 'descending' :
                        $query->orderByDesc($sort['name']);
                        break;
                }
            }
        }elseif($defaultOrderBy) {
            $query->orderBy($defaultOrderBy, $defaultDirection ?? 'desc');
        }else {
            $query->orderByDesc('created_at');
        }

        if(!$request->input('requiresCounts')) {
            return ['result' => $query->get()];
        }else {
            $count = $count ?? $query->count();
            return ['result' => $query->get(), 'count' => $count];
        }
    }

    public static function searchWithRelations(Builder|QueryBuilder $query, array $relations, Request $request)
    {
        $query->with($relations);

        if ($sorts = $request->input('sorted')) {
            foreach ($sorts as $sorted) {
                $name = Arr::get($sorted, 'name');
                $relation = Str::beforeLast($name, '.');
                $column = Str::afterLast($name, '.');
                $isRelation = strpos($name, '.');
                $relationTable = $isRelation ? $query->getRelation($relation)->getRelated()->getTable() : null;
                $query->orderBy(($isRelation ? $relationTable.'.' : '').$column, Arr::get($sorted, 'direction') === 'descending' ? 'desc' : 'asc');
            }
        }

        if ($whereClauses = $request->input('where')) {
            foreach ($whereClauses as $where) {
                $predicates = Arr::get($where, 'predicates');
                if ($predicates) {
                    self::handlePredicatesWithRelations($predicates, Arr::get($where, 'condition'), $query);
                } else {
                    $field = Arr::get($where, 'field');
                    $relation = Str::beforeLast($field, '.');
                    $column = Str::afterLast($field, '.');
                    $isRelation = strpos($field, '.');
                    $relationTable = $isRelation ? $query->getRelation($relation)->getRelated()->getTable() : null;
                    self::setWhereQueryOperator($where, $query, [], ($isRelation ? $relationTable.'.' : '').$column);
                }
            }
        }

        $count = $query->count();

        if ($request->has('skip') && $query->count() > $request->input('take')) {
            $query->skip($request->input('skip'));
        }
        if ($request->has('take')) {
            $query->take($request->input('take'));
        }

        $data = [
            'result' => $query->get()
        ];
        if ($request->input('requiresCounts')) {
            $data['count'] = $count;
        }

        return $data;
    }

    private static function setWhereQueryOperator(Array $param, Builder|QueryBuilder &$query, array $ambiguousFields = [], string $field = null)
    {
        $field = $field ?? (array_key_exists($param['field'], $ambiguousFields) ? $ambiguousFields[$param['field']] : $param['field']);
        switch ($param['operator']) {
            case 'contains':
                $query->where($field, 'like' ,'%'.$param['value'].'%');
                break;
            case 'doesnotcontain':
                $query->where($field, 'not like' ,'%'.$param['value'].'%');
                break;
            case 'startswith':
                $query->where($field, 'like' ,$param['value'].'%');
                break;
            case 'endswith':
                $query->where($field, 'like' ,'%'.$param['value']);
                break;
            case 'equal':
                $query->where(function($q)use($param, $field) {
                    $q->where($field, '=', $param['value']);
                });
                break;
            case 'notequal':
                $query->where(function($q)use($param, $field) {
                    $q->where($field, '!=', $param['value']);
                });
                break;
            case 'greaterthan':
                $query->where($field, '>', $param['value']);
                break;
            case 'greaterthanorequal':
                $query->where($field, '>=', $param['value']);
                break;
            case 'lessthan':
                $query->where($field, '<', $param['value']);
                break;
            case 'lessthanorequal':
                $query->where($field, '<=', $param['value']);
                break;
        }
    }

    private static function setOrWhereQueryOperator(Array $param, &$query, array $ambiguousFields = [], string $field = null)
    {
        $field = $field ?? (array_key_exists($param['field'], $ambiguousFields) ? $ambiguousFields[$param['field']] : $param['field']);
        switch ($param['operator']) {
            case 'contains':
                $query->orWhere($field, 'like' ,'%'.$param['value'].'%');
                break;
            case 'startswith':
                $query->orWhere($field, 'like' ,$param['value'].'%');
                break;
            case 'endswith':
                $query->orWhere($field, 'like' ,'%'.$param['value']);
                break;
            case 'equal':
                $query->orWhere(function($q)use($param, $field) {
                    $q->where($field, '=', $param['value']);
                });
                break;
            case 'notequal':
                $query->orWhere(function($q)use($param, $field) {
                    $q->where($field, '!=', $param['value']);
                });
                break;
            case 'greaterthan':
                $query->orWhere($field, '>', (int)$param['value']);
                break;
            case 'greaterthanorequal':
                $query->orWhere($field, '>=', (int)$param['value']);
                break;
            case 'lessthan':
                $query->orWhere($field, '<', (int)$param['value']);
                break;
            case 'lessthanorequal':
                $query->orWhere($field, '<=', (int)$param['value']);
                break;
        }
    }

    private static function handlePredicates(Array $predicates, $condition, &$query, array $ambiguousFields = [])
    {
        switch ($condition) {
            case 'and':
                foreach ($predicates as $predicate) {
                    $query->where(function ($q)use($predicate, $query, $ambiguousFields) {
                        if ($predicate['isComplex']) {
                            self::handlePredicates($predicate['predicates'], $predicate['condition'], $q, $ambiguousFields);
                        }else {
                            self::setWhereQueryOperator($predicate, $q, $ambiguousFields);
                        }
                    });
                }
                break;
            case 'or':
                foreach ($predicates as $predicate) {
                    $query->orWhere(function ($q)use($predicate, $query, $ambiguousFields) {
                        if ($predicate['isComplex']) {
                            self::handlePredicates($predicate['predicates'], $predicate['condition'], $q, $ambiguousFields);
                        }else {
                            self::setOrWhereQueryOperator($predicate, $q, $ambiguousFields);
                        }
                    });
                }
                break;
        }
    }

    private static function handlePredicatesWithRelations(Array $predicates, string $condition, Builder|QueryBuilder &$query)
    {
        switch ($condition) {
            case 'and':
                foreach ($predicates as $predicate) {
                    if (!Arr::get($predicate, 'value')) continue;
                    $query->where(function(Builder $q) use($predicate, $query) {
                        if ($predicate['isComplex']) {
                            self::handlePredicates($predicate['predicates'], $predicate['condition'], $q);
                        }else {
                            $field = Arr::get($predicate, 'field');
                            $relation = Str::beforeLast($field, '.');
                            $column = Str::afterLast($field, '.');
                            $isRelation = strpos($field, '.');
                            $relationTable = $isRelation ? $query->getRelation($relation)->getRelated()->getTable() : null;
                            self::setWhereQueryOperator($predicate, $q, [], ($isRelation ? $relationTable.'.' : '').$column);
                        }
                    });
                }
                break;
            case 'or':
                foreach ($predicates as $predicate) {
                    $query->orWhere(function(Builder $q) use($predicate, $query) {
                        if ($predicate['isComplex']) {
                            self::handlePredicates($predicate['predicates'], $predicate['condition'], $q);
                        }else {
                            $field = Arr::get($predicate, 'field');
                            $relation = Str::beforeLast($field, '.');
                            $column = Str::afterLast($field, '.');
                            $isRelation = strpos($field, '.');
                            $relationTable = $isRelation ? $query->getRelation($relation)->getRelated()->getTable() : null;
                            self::setOrWhereQueryOperator($predicate, $q, [], ($isRelation ? $relationTable.'.' : '').$column);
                        }
                    });
                }
                break;
        }
    }
}
