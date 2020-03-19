<?php

namespace App\Modules\<%= module %>\Models;

use Illuminate\Database\Eloquent\Model;

class <%= model %> extends Model
{

    protected $table = '<%= tableName %>';

    protected $fillable = [
        <% fillable.forEach((column) => {%>'<%= column %>',
        <% }) %>
    ];

    protected $hidden = [
        <% hidden.forEach((column) => {%>'<%= column %>',
        <% }) %>
    ];

}
