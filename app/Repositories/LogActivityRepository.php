<?php

namespace App\Repositories;

use App\Models\LogActivity;
use App\Repositories\Interfaces\LogActivityRepositoryInterface;
use Request;
use Auth;

class LogActivityRepository implements LogActivityRepositoryInterface
{
    public function all()
    {
        return LogActivity::all()->toArray();
    }

    public function saveLogActivity($data)
    {
        return LogActivity::Create([
                'subject' => $data,
                'url' => Request::url(),
                'method' => Request::method(),
                'ip' => Request::ip(),
                'agent' => Request::header('user-agent'),
                'user_id' => Auth::guard()->user()->id,
            ]);
    }

    public function getUserlog(){
        return LogActivity::where('user_id',Auth::guard()->user()->id)->get()->toArray();
    }
}
