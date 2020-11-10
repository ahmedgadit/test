<?php

namespace App\Repositories;

use App\Model\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function all()
    {
        return User::all()->toArray();
    }

    public function saveUser($data)
    {
        return User::Create();
    }
}
