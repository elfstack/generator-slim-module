<?php

namespace <%= namespace %>;

use ElfStack\SlimModule\MetaInfo;
use ElfStack\SlimModule\Interfaces\ModuleInfoInterface;

class Meta implements ModuleInfoInterface
{
    /**
     * Register routes and services
     *
     * @return ElfStack\SlimModule\MetaInfo
     */
    static public function info(): MetaInfo
    {
        $meta = MetaInfo::create('<%= name %>')
            ->namespace('<%= namespace %>')
            ->apiPrefix('<%= prefix %>');

// REGISTER APIS HERE, DO NOT DELETE
// REGISTER SERVICES HERE, DO NOT DELETE

        return $meta;
    }
}
