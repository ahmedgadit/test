<?php

namespace App\Repositories\Interfaces;

use App\User;

interface UserRepositoryInterface
{
    public function all();

    public function checkEmail($email);

    public function saveUser($data);
}
