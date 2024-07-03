<?php

namespace App\Annotations;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     required={"name", "email", "password"},
 *     @OA\Property(
 *         property="id",
 *         description="ID do usuário",
 *         type="integer",
 *         format="int64"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         description="Nome do usuário",
 *         type="string"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         description="Email do usuário",
 *         type="string"
 *     ),
 *     @OA\Property(
 *         property="password",
 *         description="Senha do usuário",
 *         type="string"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         description="Data de criação",
 *         type="string",
 *         format="date-time"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         description="Data de atualização",
 *         type="string",
 *         format="date-time"
 *     )
 * )
 */
class User {}