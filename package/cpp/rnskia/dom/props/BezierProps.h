#pragma once

#include "DerivedNodeProp.h"

#include "JsiSkPicture.h"

namespace RNSkia {

class BezierProp:
public DerivedProp<std::vector<SkPoint>> {
public:
  BezierProp(PropId name): DerivedProp<std::vector<SkPoint>>() {
    _bezierProp = addProperty(std::make_shared<NodeProp>(name));
  }
  
  void updateDerivedValue() override {
    if (_bezierProp->value()->getType() == PropType::Array) {
      // Patch requires a path with the following constraints:
      // M tl
      // C c1 c2 br
      // C c1 c2 bl
      // C c1 c2 tl (the redundant point in the last command is removed)
      auto arr = _bezierProp->value()->getAsArray();
      std::vector<SkPoint> points;
      points.reserve(12);
      
      points.push_back(PointProp::processValue(arr[0]->getValue(JsiPropId::get("pos"))));
      points.push_back(PointProp::processValue(arr[0]->getValue(JsiPropId::get("c2"))));
      points.push_back(PointProp::processValue(arr[1]->getValue(JsiPropId::get("c1"))));
      points.push_back(PointProp::processValue(arr[1]->getValue(JsiPropId::get("pos"))));
      points.push_back(PointProp::processValue(arr[1]->getValue(JsiPropId::get("c2"))));
      points.push_back(PointProp::processValue(arr[2]->getValue(JsiPropId::get("c1"))));
      points.push_back(PointProp::processValue(arr[2]->getValue(JsiPropId::get("pos"))));
      points.push_back(PointProp::processValue(arr[2]->getValue(JsiPropId::get("c2"))));
      points.push_back(PointProp::processValue(arr[3]->getValue(JsiPropId::get("c1"))));
      points.push_back(PointProp::processValue(arr[3]->getValue(JsiPropId::get("pos"))));
      points.push_back(PointProp::processValue(arr[3]->getValue(JsiPropId::get("c2"))));
      points.push_back(PointProp::processValue(arr[0]->getValue(JsiPropId::get("c1"))));
      
      
      setDerivedValue(std::move(points));
    }
  }
  
private:
  NodeProp* _bezierProp;
};

}
