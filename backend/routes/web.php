<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('swagger.index');
});


Route::get('api/docs', function () {
    return view('swagger.index');
});