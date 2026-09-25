<?php

namespace Database\Seeders;

use App\Models\DemoRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoRequestSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        if (! app()->environment('local')) {
            return;
        }

        DemoRequest::factory()->count(5)->create();
    }
}
