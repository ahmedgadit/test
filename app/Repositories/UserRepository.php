<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Auth;

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
        $data_of_birth = $data['year'].'-'. $data['month'] .'-'.$data['day'];
        return User::Create([
            'name' => $data['name'],
            'email' => $data['email'],
            'age' => $data['age'],
            'dob' => $data_of_birth,
            'password' => Hash::make($data['password']),
        ]);
    }

    public function updateUser($data){
        $data_of_birth = $data['year'].'-'.  $data['month']  .'-'.$data['day'];
        return User::find(Auth::user()->id)->Update([
            'name' => $data['name'],
            'age' => $data['age'],
            'dob' => $data_of_birth,
        ]);
    }

    public function updatePassword($data){
        return User::find(Auth::user()->id)->Update([
            'password' => Hash::make($data['password']),
            'remember_token' =>'',
        ]);
    }
}
