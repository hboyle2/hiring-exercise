import * as Hapi from "@hapi/hapi";
import Joi from "joi";
import UserController from "../controllers/UserController";
import { failAction } from "./util";

export default function getRoutes(server: Hapi.Server): void {
  server.route({
    method: "GET",
    path: "/user/{userId}",
    options: {
      auth: false,
      // auth: "jwt",
      validate: {
        params: {
          userId: Joi.string().required()
        },
        failAction
      }
    },
    handler: UserController.get
  });

  server.route({
    method: "GET",
    path: "/user",
    options: {
      auth: false
      // auth: "jwt"
    },

    handler: UserController.list
  });

  server.route({
    method: "DELETE",
    path: "/user/{userId}",
    options: {
      auth: false,
      // auth: "jwt",
      validate: {
        params: {
          userId: Joi.string().required()
        },
        failAction
      }
    },
    handler: UserController.delete
  });

  server.route({
    method: "PUT",
    path: "/password/{userId}",
    options: {
      auth: false,
      validate: {
        params: {
          userId: Joi.string().required()
        },
        payload: {
          currentPassword: Joi.string(),
          newPassword: Joi.string()
        },
        failAction
      }
    },
    handler: UserController.updatePassword
  });

  server.route({
    method: "PUT",
    path: "/user/{userId}",
    options: {
      auth: false,
      // auth: "jwt",
      validate: {
        params: {
          userId: Joi.string().required()
        },
        payload: {
          username: Joi.string(),
          firstName: Joi.string(),
          lastName: Joi.string(),
          email: Joi.string(),
          birthYear: Joi.number(),
          favColor: Joi.string()
        },
        failAction
      }
    },
    handler: UserController.update
  });

  server.route({
    method: "POST",
    path: "/user",
    options: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
          birthYear: Joi.number().required(),
          favColor: Joi.string().required()
        },
        failAction
      }
    },
    handler: UserController.create
  });
}
