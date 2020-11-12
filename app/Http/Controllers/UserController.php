<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\Interfaces\LogActivityRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

    public function __construct(UserRepositoryInterface $userRepository, LogActivityRepositoryInterface $logRepository){
        $this->userRepository = $userRepository;
        $this->logRepository = $logRepository;
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
        $this->logRepository->saveLogActivity('user changing password');
        if ($user) {
            return response()->json(['status' => true, 'message'=>'password changed successfully'], 200);
        } else {
            return response()->json(['status' => false,'message'=>'error please try agaian'], 200);
        }
    }

    public function getlogs(Request $request){

        $logs = $this->logRepository->getUserlog();

        return $request->wantsJson()
                    ? new JsonResponse(['logs'=>$logs,'status'=>true], 201)
                    : redirect($this->redirectPath());
    }

    public function updateUser(Request $request){
        $user = $this->userRepository->updateUser($request->all());
        $this->logRepository->saveLogActivity('user updating profile name or dob');
        if($user){
            return $request->wantsJson()
                ? new JsonResponse(['user'=>Auth::user()->fresh(),'status'=>true], 201)
                : redirect($this->redirectPath());
        }else{
            return $request->wantsJson()
                ? new JsonResponse(['message'=>"failed couldn't update the details",'status'=>false], 201)
                : redirect($this->redirectPath());
        }
    }

}
