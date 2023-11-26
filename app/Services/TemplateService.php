<?php

namespace App\Services;

class TemplateService
{
    public static function getSideBarItems($items = []) : array
    {
        $user = auth()->user();
        $url = app('request')->path();
        if(!$user) return [];
        $items = array_merge($items, config('template.sideBar.items'));
        $result = [];
        foreach($items as $key => $item){
            $res = self::processItem($item, str_pad($key +1, 2, '0', STR_PAD_LEFT), $url);
            if(is_array($res))
                $result[] = $res;
            continue;
        }
        return $result;
    }

    protected static function processItem(array $item, string $index, string $url)
    {
        $result = null;
        if(!self::checkPermission($item)) return null;
        $result = $item;
        $result['nodeId'] = $index;

        if (isset($item['navigateUrl']) &&  $url !=='/' && str_contains($item['navigateUrl'], $url)) {
            $result['selected'] = true;
        }elseif ($url !=='/' && !isset($item['navigateUrl']) && isset($item['conceptUrl']) && str_contains($url, $item['conceptUrl'])) {
            $result['expanded'] = true;
        }

        if(isset($result['nodeId']) && array_key_exists('nodeChild', $item) && is_array($item['nodeChild'])) {
            unset($result['nodeChild']);
            $result['nodeChild'] = [];
            foreach($item['nodeChild'] as $k => $i) {
                $r = self::processItem($i, $index .'-'.str_pad($k + 1, 2, '0', STR_PAD_LEFT), $url);
                if(is_array($r)) $result['nodeChild'][] = $r;
            }
        }

        if(isset($item['nodeChild']) && is_array($result)) {
            if(self::checkPermission($item['nodeChild'])) {
                self::setExpanded($url, $item['nodeChild'], $result);
            }
        }
        return $result;
    }

    protected static function setExpanded(string $url, array $nodeChilds, array &$result)
    {
        foreach ($nodeChilds as $node) {
            if($url !=='/' &&
                (isset($node['navigateUrl']) && str_contains($node['navigateUrl'], $url)
                    || (isset($node['conceptUrl']) && str_contains($url, $node['conceptUrl'])))){
                $result['expanded'] = true;
            }
            if(isset($node['nodeChild'])) {
                self::setExpanded($url, $node['nodeChild'], $result);
            }
        }
        return false;
    }

    protected static function checkPermission(array $item) : bool
    {
        $permissions = $item['permissions'] ?? null;
        if(!$permissions) return true;

        if(!is_countable($permissions)) {
            return auth()->user()->can($permissions);
        }

        foreach ($permissions as $permission) {
            if(auth()->user()->can($permissions)) return true;
        }

        return false;
    }
}
