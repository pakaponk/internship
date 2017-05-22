<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;

use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|unique:users|email',
            'password' => 'required|confirmed|regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/'
        ], [
            'password.regex' => 'the password field must contain minimum 8 characters at least 1 alphabet, 1 number and 1 special character!',
        ]);

        $user = User::create($request->input());
        
        return response()->json(['success' => true, 'content' => $user]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json(['success' => true, 'content' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

     public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($request->only('email', 'password'), true)){
            return response()->json(['success' => true, 'content' => Auth::user()]);
        }
        else
        {
            return response()->json(['success' => false, 'error' => 'Unauthenticated', 'message' => 'Invalid email or password'], 401);
        }
    }

    public function current(){
        if (Auth::check())
        {
            return response()->json(['success' => true, 'content' => Auth::user()]);
        }
        else
        {
            return response()->json(['success' => false, 'error' => 'Unauthenticated'], 401);
        }
    }

    public function logout(){
        Auth::logout();
        return response()->json(['success' => true]);
    }

    public function photos(User $user){
        if (Auth::id() != $user->id)
        {
            $photos = $user->photos()->with('user')->get();
        }
        else
        {
            $photos = $user->photos()->get();
        }

        return response()->json(['success' => true, 'content' => $photos]);
    }

    public function storePhoto(Request $request, User $user){
        if (!Auth::check())
        {
            return response()->json(['success' => false, 'error' => 'Unauthenticated'], 401);
        }

        if (Auth::id() != $user->id)
        {
            return response()->json(['success' => false, 'error' => 'Forbidden'], 403);
        }

        $this->validate($request, [
            'source' =>  'required|image',
            'caption' =>  'required'
        ]);

        $photo = $user->photos()->create($request->input());
        $photo->source = $request->file('source');
        $photo->save();

        return response()->json(['success' => true, 'content' => $photo]);
    }
}
