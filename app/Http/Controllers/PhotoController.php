<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Comment;
use Illuminate\Http\Request;

use Auth;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['success' => true, 'content' => Photo::with('user')->inRandomOrder()->get()]);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function show(Photo $photo)
    {
        $photo->load('user', 'comments', 'comments.user');
        return response()->json(['success' => true, 'content' => $photo]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function edit(Photo $photo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Photo $photo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Photo $photo)
    {
        //
    }

    public function storeComment(Request $request, Photo $photo){
        if (!Auth::check())
        {
            return response()->json(['success' => false, 'error' => 'Unauthenticated'], 401);
        }

        $this->validate($request, [
            'text' => 'required'
        ]);

        $comment = new Comment;
        $comment->fill($request->input());
        $comment->user()->associate(Auth::user());

        $comment = $photo->comments()->save($comment);

        return response()->json(['success' => true, 'content' => $comment]);
    }
}
