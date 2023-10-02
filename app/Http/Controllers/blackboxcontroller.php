<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Car;
use App\Models\Rental;
use App\Models\Return;
class RentalController extends Controller
{
    public function registerUser(Request $request)
    {
        // Validate the user input
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'license_number' => 'required|string|max:255',
        ]);
        // Create a new user
        $user = new User;
        $user->name = $request->name;
        $user->address = $request->address;
        $user->phone_number = $request->phone_number;
        $user->license_number = $request->license_number;
        $user->save();
        // Return the user object
        return response()->json($user);
    }
    public function addCar(Request $request)
    {
        // Validate the user input
        $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:255',
            'daily_rate' => 'required|numeric',
        ]);
        // Create a new car
        $car = new Car;
        $car->make = $request->make;
        $car->model = $request->model;
        $car->license_plate = $request->license_plate;
        $car->daily_rate = $request->daily_rate;
        $car->save();
        // Return the car object
        return response()->json($car);
    }
    public function searchCar(Request $request)
    {
        // Validate the user input
        $request->validate([
            'make' => 'nullable|string|max:255',
            'model' => 'nullable|string|max :255',
            'license_plate' => 'nullable|string|max:255',
        ]);
        // Search for cars based on the given criteria
        $cars = Car::where('make', 'like', '%' . $request->make . '%')
            ->where('model', 'like', '%' . $request->model . '%')
            ->where('license_plate', 'like', '%' . $request->license_plate . '%')
            ->get();
        // Return the list of cars
        return response()->json($cars);
    }
    public function rentCar(Request $request)
    {
        // Validate the user input
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'car_id' => 'required|integer|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
        // Check if the car is available for the given dates
        $car = Car::find($request->car_id);
        if ($car->isAvailable($request->start_date, $request->end_date)) {
            // Create a new rental
            $rental = new Rental;
            $rental->user_id = $request->user_id;
            $rental->car_id = $request->car_id;
            $rental->start_date = $request->start_date;
            $rental->end_date = $request->end_date;
            $rental->total_cost = $car->daily_rate * $rental->getDurationInDays();
            $rental->save();
            // Return the rental object
            return response()->json($rental);
        } else {
            // Return an error message
            return response()->json(['error' => 'Car is not available for the given dates'], 400);
        }
    }
    public function returnCar(Request $request)
    {
        // Validate the user input
        $request->validate([
            'rental_id' => 'required|integer|exists:rentals,id',
            'return_date' => 'required|date|after: start_date',
        ]);
        // Find the rental
        $rental = Rental::find($request->rental_id);
        // Update the rental with the return date and calculate the total cost
        $rental->return_date = $request->return_date;
        $rental->total_cost = $rental->car->daily_rate * $rental->getDurationInDays();
        $rental->save();
        // Return the rental object
        return response()->json($rental);
    }
}