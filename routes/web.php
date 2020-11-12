<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();


Route::get('/sessionStatus', 'UserController@sessionStatus');

Route::get('/check-user-email','Auth\RegisterController@checkEmail');

Auth::routes();

Route::get('/check-user-oldpassword','UserController@checkPassword');

Route::post('/updateUser','UserController@updateUser');
Route::post('/change-password','UserController@changePassword');


Route::get('/{view?}',  'HomeController@index')->name('home');
