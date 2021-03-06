<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Image;

class Photo extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'source', 'caption'
    ];

    public function setSourceAttribute($value){
        switch(gettype($value))
        {
            case "object":
                $photo = Image::make($value);
                $imageDirectory = public_path('images');
                $photoDirectoryPath = public_path('images/photos');
                if (!is_dir($imageDirectory))
                {
                    mkdir($imageDirectory, 0755);
                }

                if (!is_dir($photoDirectoryPath)){
                    mkdir($photoDirectoryPath, 0755);
                }  
                
                $photoRelativePath = 'images/photos/' . $this->attributes['id'] . '.jpg';
                $photo->save(public_path($photoRelativePath, 100));

                $this->attributes['source'] = $photoRelativePath;
                break;
            case "string":
                $this->attributes['source'] = $value;
                break;
            default:
                break;
        }
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }
}
