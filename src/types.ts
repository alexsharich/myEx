import {Request} from "express";

export type RequestWithBodyHW1<T> = Request<{},{},T>
export type RequestWithQueryHW1<T> = Request<{},{},{},T>
export type RequestWithParamsHW1<T> = Request<T>
export type RequestWithParamsAndBodyHW1<T,B> = Request<T,{},B>