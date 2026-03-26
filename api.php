<?php
$conn = new mysqli("localhost", "root", "", "retro_games");

if ($conn->connect_error) {
    die("DB connection failed");
}

// GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM games");
    $games = [];

    while ($row = $result->fetch_assoc()) {
        $games[] = $row;
    }

    echo json_encode($games);
}

// POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $title = $conn->real_escape_string($data['title']);
    $console = $conn->real_escape_string($data['console']);
    $year = (int)$data['year'];

    $conn->query("INSERT INTO games (title, console, year) VALUES ('$title', '$console', $year)");

    echo json_encode(["status" => "added"]);
}

// DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = (int)$_GET['id'];

    $conn->query("DELETE FROM games WHERE id=$id");

    echo json_encode(["status" => "deleted"]);
}
?>