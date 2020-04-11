<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

final class ServicesTest extends TestCase
{
    private static $client;

    // Create Guzzle HTTP client for test API calls
    public static function setUpBeforeClass(): void
    {
        $base_uri = 'http://localhost/htdocs_2020/GDHE/src/services/';
        self::$client = new Client(['base_uri' => $base_uri]);
    }

    public function test_READ_admin_BY_credentials()
    {
        $service = 'READ_admin_BY_credentials.php';
        $response = self::$client->request('POST', $service, [
            'json' => [
                'username' => '0001',
                'password' => '123'
            ]
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $body = json_decode($response->getBody(), true);

        $this->assertArrayHasKey('names', $body);
        $this->assertArrayHasKey('first_lname', $body);
        $this->assertArrayHasKey('second_lname', $body);
    }

    public function test_READ_groups_GB_major()
    {
        $service = 'READ_groups_GB_major.php';
        $response = self::$client->request('GET', $service);

        $this->assertEquals(200, $response->getStatusCode());
        $body = json_decode($response->getBody(), true);

        if (count($body) > 0) {
            $this->assertArrayHasKey('major', $body[0]);
            $this->assertArrayHasKey('groups', $body[0]);
        }
    }

    public function test_READ_classrooms()
    {
        $service = 'READ_classrooms.php';
        $response = self::$client->request('GET', $service);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertIsArray(json_decode($response->getBody(), true));
    }

    public function test_READ_courses_BY_group_id()
    {
        $service = 'READ_courses_BY_group_id.php';
        $response = self::$client->request('GET', $service, [
            'query' => ['group_id' => 1]
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $body = json_decode($response->getBody(), true);

        if (count($body) > 0) {
            $this->assertArrayHasKey('course_id', $body[0]);
            $this->assertArrayHasKey('required_class_hours', $body[0]);
            $this->assertArrayHasKey('professor_full_name', $body[0]);
            $this->assertArrayHasKey('subject_name', $body[0]);
        }
    }
}
