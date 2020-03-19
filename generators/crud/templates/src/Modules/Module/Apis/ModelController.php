<?php

namespace App\Modules\<%= module %>\Apis;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Modules\<%= module %>\Models\<%= model %>;
use ElfStack\SlimListing\Listing;

class <%= model %>Controller
{
    public function listing(Request $request, Response $response)
    {
        return Listing::create(<%= model %>::class)
        // TODO: IF EXIST, ATTACH
                        ->attachSearching(['field1', 'field2'])
                        ->attachSorting(['field1', 'field2'])
                        ->attachFiltering(['field1', 'field2'])
                        ->get($request, $response);
    }

    public function create(Request $request, Response $response)
    {
        // TODO: VALIDATE
        $sanitized = $request->getParsedBody();

        $item = <%= model %>::create($sanitized);

        return $response->withJson($item);
    }

    public function retrieve(Request $request, Response $response, $args)
    {
        // TODO: HANDLE NOT FOUND ERROR
        $item = <%= model %>::findOrFail($args['id']);

        return $response->withJson($item);
    }

    public function update(Request $request, Response $response, $args)
    {
        // TODO: VALIDATE
        // TODO: HANDLE NOT FOUND ERROR
        $sanitized = $request->getParsedBody();

        $item = <%= model %>::findOrFail($args['id']);

        if ($item) {
            $item->update($sanitized);
        }

        return $response->withJson($item);
    }

    public function delete(Request $request, Response $response, $args)
    {
        // TODO: HANDLE NOT FOUND ERROR
        $item = <%= model %>::findOrFail($args['id']);

        if ($item) {
            $item->delete();
        }

        return $response->withJson([ message => 'deleted' ]);
    }
}

