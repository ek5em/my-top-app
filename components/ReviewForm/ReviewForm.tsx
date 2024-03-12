import { FC, FormHTMLAttributes, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import cn from "classnames";
import { API } from "../../api/API";
import { Button, Input, Rating, Textarea } from "..";
import CrossIcon from "./cross.svg";
import classes from "./ReviewForm.module.css";

interface ReviewFormProps extends FormHTMLAttributes<HTMLFormElement> {
    productId: string;
}

export interface IReviewForm {
    name: string;
    title: string;
    description: string;
    rating: number;
}

export interface IReviewResp {
    message: string;
}

export const ReviewForm: FC<ReviewFormProps> = ({ productId, className }) => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<IReviewForm>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewResp>(
                API.review.createDemo,
                {
                    ...formData,
                    productId,
                }
            );

            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError("Что-то пошло не так, попробуйте позже");
                setIsSuccess(false);
            }
        } catch (e) {
            setError("Что-то пошло не так, попробуйте позже");
            setIsSuccess(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(classes.review, className)}>
                <Input
                    {...register("name", {
                        required: { value: true, message: "Заполните имя" },
                    })}
                    placeholder="Имя"
                    error={errors.name}
                    aria-invalid={errors.name ? true : false}
                />
                <Input
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Заполнитие заголовок",
                        },
                    })}
                    placeholder="Заголовок отзыва"
                    className={classes.title}
                    error={errors.title}
                    aria-invalid={errors.title ? true : false}
                />
                <div className={classes.rating}>
                    <span className={classes.rate}>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            required: {
                                value: true,
                                message: "Укажите рейтинг",
                            },
                        }}
                        render={({ field }) => (
                            <Rating
                                rating={field.value}
                                setRating={field.onChange}
                                isEditable
                                ref={field.ref}
                                errors={errors.rating}
                            />
                        )}
                    />
                </div>
                <Textarea
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Заполните описание",
                        },
                    })}
                    error={errors.description}
                    className={classes.reviewText}
                    placeholder="Текст отзыва"
                    aria-label="текст отзыва"
                />

                <div className={classes.submit}>
                    <Button
                        className={classes.send}
                        appearence="primary"
                        onClick={() => clearErrors()}
                    >
                        Отправить
                    </Button>
                    <span className={classes.submitInfo}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </span>
                </div>
            </div>
            {isSuccess && (
                <div
                    role="alert"
                    className={cn(classes.success, classes.panel)}
                >
                    <div className={classes.successTitle}>
                        Ваш отзыв отправлен
                    </div>
                    <span>
                        Спасибо, ваш отзыв будет опубликован после проверки
                    </span>
                    <button
                        aria-label="закрыть уведомление"
                        className={classes.close}
                        onClick={() => setIsSuccess(false)}
                    >
                        <CrossIcon />
                    </button>
                </div>
            )}
            {error && (
                <div className={cn(classes.panel, classes.error)} role="alert">
                    {error}
                    <button
                        aria-label="закрыть уведомление"
                        className={classes.close}
                        onClick={() => setError("")}
                    >
                        <CrossIcon />
                    </button>
                </div>
            )}
        </form>
    );
};
