<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Auth;

class UserController extends Controller
{
    //

    public function __construct(UserRepositoryInterface $userRepository){
        $this->userRepository = $userRepository;
    }

    public function sessionStatus(){
        return response()->json(['user' => Auth::user() ? Auth::user() : null]);
    }

}
