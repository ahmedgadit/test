<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

    public function __construct(UserRepositoryInterface $userRepository){
        $this->userRepository = $userRepository;
    }

    public function sessionStatus(){
        return response()->json(['user' => Auth::user() ? Auth::user() : null]);
    }

    public function checkPassword(Request $request){
        $user = Hash::check($request->password, Auth::user()->password);
        if ($user) {
            return response()->json(['status' => true, 'message'=>'password match successfully'], 200);
        } else {
            return response()->json(['status' => false,'message'=>'password does not match'], 200);
        }
    }

    public function changePassword(Request $request){
        $user = $this->userRepository->updatePassword($request->all());
        if ($user) {
            return response()->json(['status' => true, 'message'=>'password changed successfully'], 200);
        } else {
            return response()->json(['status' => false,'message'=>'erroro please try agaian'], 200);
        }
    }

    public function updateUser(Request $request){
        $user = $this->userRepository->updateUser($request->all());

        return $request->wantsJson()
                    ? new JsonResponse(['user'=>Auth::user()->fresh(),'status'=>true], 201)
                    : redirect($this->redirectPath());
    }

}
