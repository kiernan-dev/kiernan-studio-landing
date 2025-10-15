<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Rate limiting - simple file-based approach
$ip = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = sys_get_temp_dir() . '/contact_rate_' . md5($ip);
$current_time = time();
$rate_limit_window = 900; // 15 minutes
$max_attempts = 3;

if (file_exists($rate_limit_file)) {
    $attempts = json_decode(file_get_contents($rate_limit_file), true);
    $attempts = array_filter($attempts, function($timestamp) use ($current_time, $rate_limit_window) {
        return ($current_time - $timestamp) < $rate_limit_window;
    });
    
    if (count($attempts) >= $max_attempts) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many requests. Please try again later.']);
        exit;
    }
    
    $attempts[] = $current_time;
} else {
    $attempts = [$current_time];
}

file_put_contents($rate_limit_file, json_encode($attempts));

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Fallback to $_POST for regular form submission
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
} else {
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $message = $input['message'] ?? '';
}

// Validate input
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide a valid email address']);
    exit;
}

// Sanitize input
$name = htmlspecialchars(trim($name), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($message), ENT_QUOTES, 'UTF-8');

// Email configuration
$to = 'contact@kiernan.studio';
$subject = 'New Contact Form Submission from ' . $name;

// Email headers
$headers = [
    'From: noreply@kiernan.studio',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
];

// Email body
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8B5CF6; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .footer { background: #333; color: white; padding: 10px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div>$email</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            Sent from kiernan.studio contact form<br>
            " . date('Y-m-d H:i:s') . "
        </div>
    </div>
</body>
</html>
";

// Send email
$mail_sent = mail($to, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. Please try again later.'
    ]);
}
?>