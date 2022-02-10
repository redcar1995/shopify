#pragma once

#include <ReactCommon/TurboModuleUtils.h>

#include <map>

#include "JsiSkHostObjects.h"

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdocumentation"

#include <SkFont.h>
#include <SkTypeface.h>

#pragma clang diagnostic pop

#include <jsi/jsi.h>

namespace RNSkia {

using namespace facebook;

class JsiSkTypeface : public JsiSkWrappingSkPtrHostObject<SkTypeface> {
public:
  JSI_PROPERTY_GET(bold) { return jsi::Value(getObject()->isBold()); }
  JSI_PROPERTY_GET(italic) { return jsi::Value(getObject()->isItalic()); }
  // TODO: declare in JsiSkWrappingSkPtrHostObject via extra template parameter?
  JSI_PROPERTY_GET(__typename__) {
    return jsi::String::createFromUtf8(runtime, "Typeface");
  }

  JSI_EXPORT_PROPERTY_GETTERS(JSI_EXPORT_PROP_GET(JsiSkTypeface, bold),
                              JSI_EXPORT_PROP_GET(JsiSkTypeface, italic),
                              JSI_EXPORT_PROP_GET(JsiSkTypeface, __typename__))

  JsiSkTypeface(std::shared_ptr<RNSkPlatformContext> context,
                const sk_sp<SkTypeface> typeface)
      : JsiSkWrappingSkPtrHostObject(context, typeface){};

  /**
    Returns the underlying object from a host object of this type
   */
  static sk_sp<SkTypeface> fromValue(jsi::Runtime &runtime,
                                     const jsi::Value &obj) {
    return obj.asObject(runtime)
        .asHostObject<JsiSkTypeface>(runtime)
        .get()
        ->getObject();
  }

  /**
   Returns the jsi object from a host object of this type
  */
  static jsi::Value toValue(jsi::Runtime &runtime,
                              std::shared_ptr<RNSkPlatformContext> context,
                              const sk_sp<SkTypeface> tf) {
    return jsi::Object::createFromHostObject(
              runtime, std::make_shared<JsiSkTypeface>(context, tf));
  }

private:
  static SkFontStyle getFontStyleFromNumber(int fontStyle) {
    switch (fontStyle) {
    case 0:
      return SkFontStyle::Normal();
    case 1:
      return SkFontStyle::Bold();
    case 2:
      return SkFontStyle::Italic();
    case 3:
      return SkFontStyle::BoldItalic();
    default:
      return SkFontStyle::Normal();
    };
  }
};

} // namespace RNSkia
