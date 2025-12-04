import {
    ApiOperation,
    ApiBearerAuth,
    ApiResponse,
} from '@nestjs/swagger';

const UsersExamples = {
    FindAllUsers: [
        {
            id: 'UUID',
            fullName: 'Fulano da Silva',
            email: 'fulanodasilva@gmail.com',
        },
        {
            id: 'UUID',
            fullName: 'Ciclano Costa',
            email: 'ciclanocosta@gmail.com',
        },
    ],
    FindById: [
        {
            id: 'UUID',
            fullName: 'Fulano da Silva',
            email: 'fulanodasilva@gmail.com',
        },
    ],
    DeleteUser: [
        {
            deleted: "UUID"
        },
    ],
    Unauthorized: {
        statusCode: 401,
        message: 'Token inválido ou ausente',
        error: 'Unauthorized',
    },

    NotFound: {
        statusCode: 404,
        message: 'Recurso não encontrado',
        error: 'Not Found',
    },

    InternalError: {
        statusCode: 500,
        message: 'Erro interno do servidor',
        error: 'Internal Server Error',
    },
}

export const UsersSwagger = {
    CreateUser: {
        ApiOperation: ApiOperation({ summary: 'DTO para criar um usuário' }),
        ApiBearerAuth: ApiBearerAuth(),
        ApiResponse401: ApiResponse({
            status: 401,
            description: 'Não autorizado',
            schema: { example: UsersExamples.Unauthorized },
        }),
        ApiResponse500: ApiResponse({
            status: 500,
            description: 'Erro interno no servidor',
            schema: { example: UsersExamples.InternalError },
        }),
    },
    GetAllUsers: {
        ApiOperation: ApiOperation({ summary: 'Lista geral de usuários' }),
        ApiBearerAuth: ApiBearerAuth(),
        ApiResponse200: ApiResponse({
            status: 200,
            description: 'Lista de todas os usuários',
            schema: { example: UsersExamples.FindAllUsers },
        }),
        ApiResponse401: ApiResponse({
            status: 401,
            description: 'Não autorizado',
            schema: { example: UsersExamples.Unauthorized },
        }),
        ApiResponse500: ApiResponse({
            status: 500,
            description: 'Erro interno no servidor',
            schema: { example: UsersExamples.InternalError },
        }),
    },
    GetById: {
        ApiOperation: ApiOperation({ summary: 'Usuário filtrado por ID' }),
        ApiBearerAuth: ApiBearerAuth(),
        ApiResponse200: ApiResponse({
            status: 200,
            description: 'Dados do usuário',
            schema: { example: UsersExamples.FindById },
        }),
        ApiResponse401: ApiResponse({
            status: 401,
            description: 'Não autorizado',
            schema: { example: UsersExamples.Unauthorized },
        }),
        ApiResponse500: ApiResponse({
            status: 500,
            description: 'Erro interno no servidor',
            schema: { example: UsersExamples.InternalError },
        }),
    },
    PutById: {
        ApiOperation: ApiOperation({ summary: 'DTO para atualizar um usuário' }),
        ApiBearerAuth: ApiBearerAuth(),
        ApiResponse401: ApiResponse({
            status: 401,
            description: 'Não autorizado',
            schema: { example: UsersExamples.Unauthorized },
        }),
        ApiResponse500: ApiResponse({
            status: 500,
            description: 'Erro interno no servidor',
            schema: { example: UsersExamples.InternalError },
        }),
    },
    DeleteUser: {
        ApiOperation: ApiOperation({ summary: 'Deletar usuário por ID' }),
        ApiBearerAuth: ApiBearerAuth(),
        ApiResponse200: ApiResponse({
            status: 200,
            description: 'Dados do usuário',
            schema: { example: UsersExamples.DeleteUser },
        }),
        ApiResponse401: ApiResponse({
            status: 401,
            description: 'Não autorizado',
            schema: { example: UsersExamples.Unauthorized },
        }),
        ApiResponse500: ApiResponse({
            status: 500,
            description: 'Erro interno no servidor',
            schema: { example: UsersExamples.InternalError },
        }),
    },
}