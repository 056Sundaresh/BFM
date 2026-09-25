<?php

namespace Tests\Feature;

use Tests\TestCase;

class DemoFormValidationTest extends TestCase
{
    public function test_name_is_required_when_submitting_demo_form(): void
    {
        $response = $this->from('/')->post('/', [
            'name' => '',
            'college' => 'Test College',
            'designation' => 'Coordinator',
            'email' => 'admin@example.com',
            'phone' => '1234567890',
            'students' => '10',
            'program' => 'Artificial Intelligence',
            'message' => 'Need a demo',
        ]);

        $response->assertRedirect('/');
        $response->assertSessionHasErrors('name');
    }
}
