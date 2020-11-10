<?php

namespace App\Repositories;

use App\Model\LogActivity;
use App\Repositories\Interfaces\LogActivityRepositoryInterface;

class LogActivityRepository implements LogActivityRepositoryInterface
{
    public function all()
    {
        return LogActivity::all()->toArray();
    }

    public function saveLogActivity($data)
    {
        return LogActivity::Create();
    }
}
