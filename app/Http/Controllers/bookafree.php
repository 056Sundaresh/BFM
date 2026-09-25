<?php

namespace App\Http\Controllers;

use App\Models\DemoRequest;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class bookafree extends Controller
{
    public function submitform(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'college' => ['required', 'string', 'max:255'],
            'designation' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^(?=.*\d)[0-9+().\s-]{7,20}$/'],
            'students' => ['required', 'integer', 'min:1'],
            'program' => ['required', 'string', 'in:Artificial Intelligence,Digital Marketing,Robotics & Automation,IT & Agile Skills'],
            'message' => ['nullable', 'string', 'max:2000'],
        ], [
            'name.required' => 'Please provide your full name.',
            'college.required' => 'Please provide your college or institution name.',
            'designation.required' => 'Please provide your designation.',
            'email.required' => 'Please provide a valid email address.',
            'email.email' => 'Please provide a valid email address.',
            'phone.required' => 'Please provide a valid phone number.',
            'phone.regex' => 'Please provide a valid phone number.',
            'students.required' => 'Please provide the number of students.',
            'students.integer' => 'Please enter a whole number of students.',
            'students.min' => 'The number of students must be at least 1.',
            'program.required' => 'Please select a preferred program.',
            'program.in' => 'Please select a valid program.',
        ]);

        try {
            DemoRequest::create($validated);
        } catch (QueryException $exception) {
            report($exception);

            return redirect('/')->withInput()->with('form_error', 'We could not save your request right now. Please try again.');
        }

        return redirect('/')->with('success', 'Your request was saved successfully. Thank you!');
    }
}
