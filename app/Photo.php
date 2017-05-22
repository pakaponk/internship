<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Image;

class Photo extends Model
{
    //
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
                $photoDirectoryPath = public_path('images/photos');
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
}
