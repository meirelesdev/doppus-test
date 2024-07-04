<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        // Cria um usuário para autenticação
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // Obtém o token JWT para o usuário criado
        $this->token = JWTAuth::fromUser($user);
    }

    public function test_user_can_be_created()
    {
        $response = $this->postJson('/api/users', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'data' => [
                         'id', 'name', 'email', 'created_at', 'updated_at'
                     ],
                     'token'
                 ]);
    }

    public function test_user_creation_fails_with_invalid_data()
    {
        $response = $this->postJson('/api/users', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'short',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function test_user_can_be_listed()
    {
        User::factory()->count(5)->create();

        $response = $this->getJson('/api/users', ['Authorization' => "Bearer {$this->token}"]);

        $response->assertStatus(200)
                    ->assertJsonStructure([
                            ['id', 'name', 'email', 'created_at', 'updated_at']
                    ])
                    ->assertJsonCount(6);
    }

    public function test_user_can_be_shown()
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}", ['Authorization' => "Bearer {$this->token}"]);

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $user->id,
                     'name' => $user->name,
                     'email' => $user->email,
                 ]);
    }

    public function test_user_show_fails_with_nonexistent_user()
    {
        $response = $this->getJson('/api/users/999', ['Authorization' => "Bearer {$this->token}"]);

        $response->assertStatus(404);
    }

    public function test_user_can_be_updated()
    {
        $user = User::factory()->create();

        $response = $this->putJson("/api/users/{$user->id}", [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
            'password' => 'newpassword',
        ], ['Authorization' => "Bearer {$this->token}"]);

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $user->id,
                     'name' => 'Updated User',
                     'email' => 'updated@example.com',
                 ]);
    }

    public function test_user_update_fails_with_invalid_data()
    {
        $user = User::factory()->create();

        $response = $this->putJson("/api/users/{$user->id}", [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'short',
        ], ['Authorization' => "Bearer {$this->token}"]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function test_user_can_be_deleted()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}", [], ['Authorization' => "Bearer {$this->token}"]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'User deleted'
                 ]);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_user_delete_fails_with_nonexistent_user()
    {
        $response = $this->deleteJson('/api/users/999', [], ['Authorization' => "Bearer {$this->token}"]);

        $response->assertStatus(404);
    }
}