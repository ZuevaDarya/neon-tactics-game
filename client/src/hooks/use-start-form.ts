import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { DefaultValues, FieldValues, Path, PathValue, useForm } from "react-hook-form";
import { ZodType } from "zod";
import { StartFormInputName } from "../constants/input-name";
import { useAppSelector } from "../services/store";

type TUseStartFromProps<T extends FieldValues> = {
  zodSchema: ZodType<T, T>;
  defaultValues: DefaultValues<T>;
};

const useStartForm = <T extends FieldValues>({
  zodSchema,
  defaultValues,
}: TUseStartFromProps<T>) => {
  const formMethods = useForm<T>({
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    defaultValues,
  });
  const { id } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

  const {
    formState: { errors },
    watch,
    clearErrors,
    setValue,
    trigger,
    reset,
  } = formMethods;

  const playerValue = watch(StartFormInputName.Player as Path<T>);
  const roomIdValue = watch(StartFormInputName.RoomId as Path<T>);

  useEffect(() => {
    if (playerValue === "" && errors.player) {
      clearErrors(StartFormInputName.Player as Path<T>);
    }
  }, [playerValue, errors.player, clearErrors]);

  useEffect(() => {
    if (roomIdValue === "" && errors.roomId) {
      clearErrors(StartFormInputName.RoomId as Path<T>);
    }
  }, [roomIdValue, errors.roomId, clearErrors]);

  useEffect(() => {
    if (id) {
      setValue(StartFormInputName.RoomId as Path<T>, id as PathValue<T, Path<T>>);
      trigger(StartFormInputName.RoomId as Path<T>);
    }
  }, [id, setValue, trigger]);

  useEffect(() => {
    const nameToSet = player?.name || creator?.name;

    if (nameToSet) {
      setValue(StartFormInputName.Player as Path<T>, nameToSet as PathValue<T, Path<T>>);
      trigger(StartFormInputName.Player as Path<T>);
    }
  }, [player, creator, setValue, trigger]);

  useEffect(() => {
    reset(defaultValues);
  }, []);

  const onError = () => {
    setIsSubmitError(true);
  };

  const resetForm = () => {
    reset(defaultValues);
    setIsSubmitError(false);
  };

  const isFieldValueEmpty = useMemo(
    () => playerValue === "" || roomIdValue === "",
    [playerValue, roomIdValue]
  );

  const isRoomIdValueEmpty = useMemo(() => roomIdValue === "", [roomIdValue]);
  const isPlayerValueEmpty = useMemo(() => playerValue === "", [playerValue]);

  return {
    ...formMethods,
    onError,
    isSubmitError,
    setIsSubmitError,
    isFieldValueEmpty,
    isRoomIdValueEmpty,
    roomIdValue,
    isPlayerValueEmpty,
    playerValue,
    resetForm,
  };
};

export default useStartForm;
