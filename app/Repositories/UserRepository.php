<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function all()
    {
        return User::all()->toArray();
    }

    public function checkEmail($em)
    {
        return User::where('email', '=', $em)->first();
    }

    public function saveUser($data)
    {
        return User::Create($data);
    }
}
