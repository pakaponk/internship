<?php

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

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'web'], function() {
    Route::post('/auth/login', 'UserController@login');
    Route::get('/auth/logout', 'UserController@logout');
    Route::get('/auth/current', 'UserController@current');

    Route::post('/users/{user}/photos', 'UserController@storePhoto');

    Route::resource('users', 'UserController', 
        ["only" => ['store']]);
});


Route::any('{catchall}', function(){
    return view('index');
});