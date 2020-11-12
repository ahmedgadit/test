<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use App\Repositories\Interfaces\LogActivityRepositoryInterface;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(LogActivityRepositoryInterface $logRepository)
    {
        $this->middleware('guest')->except('logout');
        $this->logRepository = $logRepository;
    }

    public function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        if ($response = $this->authenticated($request, $this->guard()->user())) {
            return $response;
        }
        $user = $this->guard()->user();

        $this->logRepository->saveLogActivity('user login');
        if(isset($user)){
            return $request->wantsJson()
                        ? new JsonResponse(['user'=>$user,'status'=>true], 201)
                        : redirect()->intended($this->redirectPath());
        }else{
            return $request->wantsJson()
                        ? new JsonResponse(['message'=>'login failed please try again','status'=>true], 201)
                        : redirect()->intended($this->redirectPath());
        }

    }

    public function logout(Request $request)
    {

        $this->logRepository->saveLogActivity('user logout');

        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        if ($response = $this->loggedOut($request)) {
            return $response;
        }

        return $request->wantsJson()
            ? new JsonResponse(['status'=>true,'user'=>[]], 201)
            : redirect('/');
    }
}
