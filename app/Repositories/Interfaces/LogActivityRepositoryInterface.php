<?php

namespace App\Repositories\Interfaces;

use App\LogActivity;

interface LogActivityRepositoryInterface
{
    public function all();

    public function saveLogActivity($data);

    public function getUserlog();
}
