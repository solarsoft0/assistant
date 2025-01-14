import { NameCases, ScopedVariableNamer } from "@coli.codes/naming";
import { IReflectNodeReference } from "@design-sdk/figma-node";
import { variant } from "@design-sdk/figma/features";
import {
  FigmaBoolean,
  FigmaNumber,
  FigmaUnique,
  _FigmaVariantPropertyCompatType_to_string,
} from "@design-sdk/figma/features/variant";

import {
  InterfaceDeclaration,
  PropertySignature,
  Identifier,
  LiteralType,
  StringLiteral,
  UnionType,
  BooleanKeyword,
  CommentExpression,
  NumberKeyword,
  stringfy,
} from "coli";
import { singleLayerPropertyMappingToPropertySignature } from "../interface-code-builder/single-layer-property-mapping-to-property-signature";
import { typeToColiType } from "../interface-code-builder/type-to-coli-type";
import { IProperties } from "../types";
import { ISingleLayerPropertyMapping } from "../types/single-layer-property-type";

export default function ({
  root,
  rootInterfaceName,
  rootProperties,
  propertyNamer,
  layerProperties,
  layer,
}: {
  root: IReflectNodeReference;
  rootInterfaceName: string;
  rootProperties: IProperties;
  propertyNamer: ScopedVariableNamer;
  layerProperties: IProperties;
  layer: IReflectNodeReference;
}) {
  const mapper = (singleLineProperty) => {
    return singleLayerPropertyMappingToPropertySignature({
      singlePropertyMapping: singleLineProperty,
      propertyNamer,
    });
  };

  const _parent_static_property_signatures = rootProperties.map(mapper);

  const _this_static_property_signatures = [...layerProperties];

  const _this_configurable_property_signature = [
    ..._this_static_property_signatures,
    // TODO:
    <ISingleLayerPropertyMapping>{
      layer: {
        id: "unknown",
      },
      schema: {
        name: "todo",
        type: "todo",
      },
    },
  ].map(mapper);

  return [
    // @ts-ignore
    new CommentExpression({
      style: "multi-line",
      content: `${root.name}'s interface`,
    }) as any,

    new InterfaceDeclaration({
      name: rootInterfaceName,
      members: [
        ..._parent_static_property_signatures,

        // @ts-ignore
        new CommentExpression({
          style: "single-line",
          content: `properties of "${layer.name}"`,
        }) as any,
        new CommentExpression({
          style: "single-line",
          content: `-------------------------------`,
        }) as any,
        ..._this_configurable_property_signature,
        new CommentExpression({
          style: "single-line",
          content: `-------------------------------`,
        }) as any,
        // link button
        new CommentExpression({
          style: "single-line",
          content: `add new property mapping`,
        }) as any,
      ],
    }),
  ];
}
