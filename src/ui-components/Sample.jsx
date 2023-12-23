/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Heading, SelectField, TextField } from "@aws-amplify/ui-react";
export default function Sample(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="column"
      width="350px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      padding="30px 30px 30px 30px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Sample")}
      {...rest}
    >
      <Heading
        width="unset"
        height="unset"
        shrink="0"
        level="2"
        children="施設マスタ"
        {...getOverrideProps(overrides, "Heading")}
      ></Heading>
      <TextField
        width="unset"
        height="unset"
        label="id"
        shrink="0"
        alignSelf="stretch"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        width="unset"
        height="unset"
        label="name"
        shrink="0"
        alignSelf="stretch"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        width="unset"
        height="unset"
        label="description"
        shrink="0"
        alignSelf="stretch"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SelectField
        width="unset"
        height="unset"
        label="category"
        shrink="0"
        alignSelf="stretch"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "category")}
      ></SelectField>
    </Flex>
  );
}
