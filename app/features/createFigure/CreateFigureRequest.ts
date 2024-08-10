import { InferType } from "yup";
import { CreateFigureRequestSchema } from "./CreateFigureRequestSchema";

export type CreateFigureRequest = InferType<typeof CreateFigureRequestSchema>;
