<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $token = auth("sanctum")->user()->createToken('auth_token')->plainTextToken;
            return response()->json([
                "message" => "Login Success",
                "success" => true,
                "details"=>auth("sanctum")->user(),
                "token"=> $token
            ]);
        } else {
            return response()->json([
                "message" => "Incorrect Email or Password. Please try again",
                "success" => false
            ]);
        }
    }

    public function currentuser(Request $request)
    {
        $users = auth('sanctum')->user();
        return $users;
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

    }

}
