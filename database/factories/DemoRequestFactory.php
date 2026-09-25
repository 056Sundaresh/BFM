<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\DemoRequest>
 */
class DemoRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'college' => fake()->company().' College',
            'designation' => fake()->jobTitle(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->numerify('+1-###-###-####'),
            'students' => fake()->numberBetween(1, 5000),
            'program' => fake()->randomElement([
                'Artificial Intelligence',
                'Digital Marketing',
                'Robotics & Automation',
                'IT & Agile Skills',
            ]),
            'message' => fake()->optional()->sentence(),
        ];
    }
}
