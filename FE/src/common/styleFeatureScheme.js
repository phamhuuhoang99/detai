import Feature from "ol/Feature";
import { Style } from "ol/style";
import Point from "ol/geom/Point";
import { Icon, Stroke, Fill } from "ol/style";
import LineString from "ol/geom/LineString";
// import imgArrow from "../assets/arrow.png";
import Polygon from "ol/geom/Polygon";
// import { asArray } from "ol/color";

export function styleFeatureScheme(sourceSchemesLayout, schemes) {
  function createNewFeature(coordinates, type) {
    if (type === "LineString")
      return new Feature({
        geometry: new LineString(coordinates),
      });
    else if (type === "Point") {
      return new Feature({
        geometry: new Point(coordinates),
      });
    } else if (type === "Polygon") {
      return new Feature({
        geometry: new Polygon(coordinates),
      });
    }
  }

  function addFeatureInLayer(styles, coordinates, type) {
    try {
      let feature = createNewFeature(coordinates, type);
      feature.setStyle(styles);
      sourceSchemesLayout.addFeature(feature);
    } catch (e) {
      console.log(e);
    }
  }

  function styleArrow(start, end, color) {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const rotation = Math.atan2(dy, dx);

    let styleArrow = new Array(
      new Style({
        geometry: new Point(end),
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/arrow.png",
          anchor: [0.75, 0.5],
          rotateWithView: true,
          rotation: -rotation,
          scale: 1.25,
          color: color,
        }),
      })
    );
    return styleArrow;
  }

  sourceSchemesLayout.clear();

  for (let scheme of schemes) {
    const coordinates = scheme.geom.coordinates;
    const coordinateEndLine = coordinates[coordinates.length - 1];
    const coordinatePrevEndLine = coordinates[coordinates.length - 2];

    switch (scheme.type_draw) {
      case "Arrow": {
        const styleArrowLine = styleArrow(
          coordinatePrevEndLine,
          coordinateEndLine,
          scheme.color_scheme
        );
        const styleBodyArrow = new Style({
          stroke: new Stroke({
            color: scheme.color_scheme,
            width: 2,
          }),
        });

        addFeatureInLayer(styleArrowLine, coordinateEndLine, "Point");
        addFeatureInLayer(styleBodyArrow, coordinates, "LineString");
        break;
      }
      case "LineString": {
        let styleLine = new Style({
          stroke: new Stroke({
            color: scheme.color_scheme,
            width: 2,
          }),
        });
        addFeatureInLayer(styleLine, coordinates, "LineString");
        break;
      }
      case "Polygon": {
        const color = scheme.color_scheme;
        let stylePolygon = new Style({
          fill: new Fill({
            color: color,
          }),
        });

        addFeatureInLayer(stylePolygon, coordinates, "Polygon");
        break;
      }
    }
  }
}
