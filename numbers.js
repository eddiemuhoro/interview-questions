
let CAD;

let notifyUser;

const constraintFunctions = [];
let fullSolve = 1000;
let default_Loops = 1000;
const tolerance = 1e-6;

sketchObject = {
    points: [{ id: 0, x: 0, y: 0, fixed: true },],
    geometries: [],
    constraints: [{ id: 0, type: "⏚", points: [0] },],
}




function removePointById(id) {

    // Remove the point
    id = parseInt(id);
    if (id === 0) return;

    console.log("removing point", id);
    sketchObject.points = sketchObject.points.filter(point => point.id !== id);

    // Remove geometries that reference the point
    // geometries now have a points array that contains the IDs of the points
    sketchObject.geometries = sketchObject.geometries.filter(geometry => {
        return !geometry.points.includes(id);
    });

    // Remove constraints that reference the point
    sketchObject.constraints = sketchObject.constraints.filter(constraint => {
        return !constraint.points.includes(id);
    });
}

function removeGeometryById(id) {
    // Remove the geometry
    id = parseInt(id);
    if (id === 0) return;

    sketchObject.geometries = sketchObject.geometries.filter(geometry => parseInt(geometry.id) !== id);

    // Remove constraints that reference the geometry (if any future constraints depend on specific geometries)
    sketchObject.constraints = sketchObject.constraints.filter(constraint => {
        // Assuming a constraint might have a 'geometryId' property that references a geometry
        return constraint.geometryId !== id;
    });
}

function removeConstraintById(id) {
    id = parseInt(id);
    sketchObject.constraints = sketchObject.constraints.filter(constraint => parseInt(constraint.id) !== id);
}






function toggleConstruction() {
    console.log(selectedItems);
    selectedItems.forEach((item) => {
        if (item.type === "geometry") {
            let geometry = sketchObject.geometries.find((g) => g.id === parseInt(item.id));
            // check if construction property exists
            if (geometry.construction === undefined) geometry.construction = false;
            geometry.construction = !geometry.construction;
        }
    });
}







function applyHorizontalConstraint() {
    createConstraint("━", selectedItems);
}

function applyVerticalConstraint() {
    createConstraint("│", selectedItems);
}

function applyDistanceConstraint() {
    createConstraint("⟺", selectedItems);
}

function applyPerpendicularConstraint() {
    createConstraint("⟂", selectedItems);
}

function applyCoincidenceConstraint() {
    createConstraint("≡", selectedItems);
}

function applyFixedPointConstraint() {
    createConstraint("⏚", selectedItems);
}

function applyParallelConstraint() {

    createConstraint("∥", selectedItems);
}

function applyAngleConstraint() {
    createConstraint("∠", selectedItems);
}

function applyPointOnLineConstraint() {
    createConstraint("⏛", selectedItems);
}


function applyColinearConstraint() {
    createConstraint("⋱", selectedItems);
}


function applyEqualLengthConstraint() {
    createConstraint("⇌", selectedItems);
}




function geometryCreateLine() {
    CAD.appState.mode = "createGeometry";
    CAD.appState.type = "line";
    CAD.appState.requiredSelections = 2;
    createGeometry("line");
}

function geometryCreateCircle() {
    CAD.appState.mode = "createGeometry";
    CAD.appState.type = "circle";
    CAD.appState.requiredSelections = 2;
    createGeometry("circle");
}

function geometryCreateArc() {
    CAD.appState.mode = "createGeometry";
    CAD.appState.type = "arc";
    CAD.appState.requiredSelections = 3;
    createGeometry("arc");
}



function createGeometry(type, points = []) {
    // If no points are provided, use the selected points
    if (points.length === 0 && selectedItems.length > 0) {
        points = [];
        selectedItems.forEach((item) => {
            if (item.type === "point") points.push(sketchObject.points.find((p) => p.id === parseInt(item.id)));
        });
    }

    if (points.length !== CAD.appState.requiredSelections) {
        //console.log("wrong number of points to make constraint");
        return false;
    }



    let pointIds;
    if (typeof points[0] === 'object') {
        pointIds = points.map((p) => p.id)
    } else {
        pointIds = points;
    };
    //console.log(typeof points[0], pointIds);

    /// Array of IDs of the points
    if (pointIds.length === 0) return false;


    let maxId = Math.max(...sketchObject.geometries.map((geo) => geo.id), 0) + 1;
    let newGeometry = {
        id: maxId,
        type: type,
        points: pointIds,
        construction: false,
    };


    console.log("here is the new geometry", newGeometry);
    sketchObject.geometries.push(newGeometry);
    sketchObject = solveSketch(sketchObject, "full");
    CAD.appState.mode = "";
    CAD.appState.type = "";
    CAD.appState.requiredSelections = 0;
    return true;
}






function createConstraint(type, currentlySelected) {
    //console.log(currentlySelected);
    let selectedPoints = [];

    let geometryType = null;

    currentlySelected.forEach((item) => {
        if (item.type === "point") selectedPoints.push(sketchObject.points.find((p) => p.id === parseInt(item.id)));
        if (item.type === "geometry") {
            let geometry = sketchObject.geometries.find((g) => g.id === parseInt(item.id));
            geometry.points.forEach((pId) => {
                selectedPoints.push(sketchObject.points.find((p) => p.id === pId));
            });
            if (geometry.type === "arc") selectedPoints.pop();

            geometryType = geometry.type;
        }
    });

    console.log(selectedPoints);
    /// give me an array of all the point ids in the selectedPoints array
    let selectedPointIds = selectedPoints.map((p) => parseInt(p.id));


    if (selectedPoints.length === 0) return;

    let newConstraint = {
        id: 0,
        type: type,
        points: selectedPointIds,
        labelX: 0,
        labelY: 0,
        displayStyle: "",
    };

    if (selectedPoints.length === 1) {
        if (type === "⏚") return createAndPushNewConstraint(newConstraint);
    }
    if (selectedPoints.length === 2) {
        if (type === "━") return createAndPushNewConstraint(newConstraint);
        if (type === "│") return createAndPushNewConstraint(newConstraint);
        if (type === "≡") return createAndPushNewConstraint(newConstraint);

        if (type === "⟺") {
            newConstraint.value = distance(selectedPoints[0], selectedPoints[1])
            newConstraint.value = parseFloat(newConstraint.value.toFixed(4));
            if (geometryType === "arc" || geometryType === "circle") newConstraint.displayStyle = "radius";

            return createAndPushNewConstraint(newConstraint);
        }

    }
    if (selectedPoints.length === 3) {
        if (type === "⏛") return createAndPushNewConstraint(newConstraint);
    }
    if (selectedPoints.length === 4) {
        if (type === "⟂") {
            let line1AngleA = calculateAngle(selectedPoints[0], selectedPoints[1]);
            let line1AngleB = calculateAngle(selectedPoints[1], selectedPoints[0]);
            let line2Angle = calculateAngle(selectedPoints[2], selectedPoints[3]);

            // Normalize angles to [-180, 180)
            line1AngleA = (line1AngleA + 180) % 360 - 180;
            line1AngleB = (line1AngleB + 180) % 360 - 180;
            line2Angle = (line2Angle + 180) % 360 - 180;

            let differenceBetweenAnglesA = line1AngleA - line2Angle;
            let differenceBetweenAnglesB = line1AngleB - line2Angle;

            // Determine which angle is closer to the target angle
            // swap the points if the other angle is closer
            if (Math.abs(90 - differenceBetweenAnglesA) > Math.abs(90 - differenceBetweenAnglesB)) {
                [newConstraint.points[0], newConstraint.points[1]] = [newConstraint.points[1], newConstraint.points[0]];
            }

            return createAndPushNewConstraint(newConstraint);
        }
        if (type === "∥") {
            let line1AngleA = calculateAngle(selectedPoints[0], selectedPoints[1]);
            let line1AngleB = calculateAngle(selectedPoints[1], selectedPoints[0]);
            let line2Angle = calculateAngle(selectedPoints[2], selectedPoints[3]);

            // Normalize angles to [-180, 180)
            line1AngleA = (line1AngleA + 180) % 360 - 180;
            line1AngleB = (line1AngleB + 180) % 360 - 180;
            line2Angle = (line2Angle + 180) % 360 - 180;

            let differenceBetweenAnglesA = line1AngleA - line2Angle;
            let differenceBetweenAnglesB = line1AngleB - line2Angle;

            // Determine which angle is closer to the target angle
            // swap the points if the other angle is clos>er
            if (Math.abs(180 - differenceBetweenAnglesA) > Math.abs(180 - differenceBetweenAnglesB)) {
                [newConstraint.points[0], newConstraint.points[1]] = [newConstraint.points[1], newConstraint.points[0]];
            }

            return createAndPushNewConstraint(newConstraint);
        }
        if (type === "∠") {
            /// calculate the current angle between the lines formed by the points
            /// and set the value of the constraint to the current angle

            let line1Angle = calculateAngle(selectedPoints[0], selectedPoints[1]);
            let line2Angle = calculateAngle(selectedPoints[2], selectedPoints[3]);

            // Normalize angles to [-180, 180)
            line1Angle = (line1Angle + 180) % 360 - 180;
            line2Angle = (line2Angle + 180) % 360 - 180;

            let differenceBetweenAngles = line1Angle - line2Angle;

            // Normalize difference to 
            differenceBetweenAngles = (differenceBetweenAngles + 360) % 360;

            newConstraint.value = differenceBetweenAngles;
            return createAndPushNewConstraint(newConstraint);
        }
        if (type === "⇌") return createAndPushNewConstraint(newConstraint);
        if (type === "⋱") return createAndPushNewConstraint(newConstraint);
    }

    notifyUser("Invalid selection for constraint type " + type + "\n" + "with " + selectedPoints.length + " points.", "warning");
}



function createAndPushNewConstraint(constraint) {
    let maxId = Math.max(...sketchObject.constraints.map((c) => c.id), 0) + 1;
    constraint.id = maxId;
    sketchObject.constraints.push(constraint);
    sketchObject = solveSketch(sketchObject, "full");
    notifyUser("Constraint added", "info");
}





export const sketch = {
    sketchObject: sketchObject,
    setup,
    removePointById,
    removeGeometryById,
    removeConstraintById,
    toggleConstruction,
    applyHorizontalConstraint,
    applyVerticalConstraint,
    applyDistanceConstraint,
    applyPerpendicularConstraint,
    applyCoincidenceConstraint,
    applyFixedPointConstraint,
    applyParallelConstraint,
    applyAngleConstraint,
    applyPointOnLineConstraint,
    applyEqualLengthConstraint,
    applyColinearConstraint,
    geometryCreateLine,
    geometryCreateCircle,
    geometryCreateArc,
    createConstraint,
    createGeometry,
    createAndPushNewConstraint,
    solveSketch,
    fileIO,
    getPointById,
    simplifyCoincidentConstraints,
}















/// function that looks up a point by its id
function getPointById(id) {
    return sketchObject.points.find((p) => p.id === parseInt(id));
}





function solveSketch(sketchToSolve, iterations = null) {
    if (iterations === null) iterations = default_Loops;
    if (iterations === "full") iterations = fullSolve;
    const solver = new ConstraintSolver(JSON.stringify(sketchToSolve));
    const solvedSketch = solver.solve(iterations);
    return solvedSketch;
}


class Point {
    constructor(id, x, y, fixed = false) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.fixed = fixed;
    }
}

export class ConstraintSolver {
    constructor(sketchJSON) {
        const sketch = JSON.parse(sketchJSON);
        this.points = sketch.points.map(p => new Point(p.id, p.x, p.y, p.fixed));
        this.geometries = sketch.geometries;
        this.constraints = sketch.constraints;
    }


    processConstraintsOfType(type) {
        let constraintsOfType;
        if (type === "all") {
            constraintsOfType = this.constraints;
        } else {
            constraintsOfType = this.constraints.filter(c => c.type === type);
        }

        // shuffle the order of the constraints.
        constraintsOfType = shuffle(constraintsOfType);


        constraintsOfType.forEach(constraint => {
            //console.log(constraint.value);
            constraint.status = "";
            let constraintValue = parseFloat(constraint.value);

            const points = constraint.points.map(id => this.points.find(p => p.id === id));
            const beforePoints = JSON.stringify(points);
            if (constraint.previousPointValues !== undefined && constraint.previousPointValues === beforePoints && constraint.status === "solved") return;
            constraintFunctions[constraint.type](this, constraint, points, constraintValue);
            const afterPoints = JSON.stringify(points);
            if (beforePoints == afterPoints) {
                constraint.status = "solved";
                constraint.previousPointValues = afterPoints;
            }

            //this.tidyDecimalsOfPoints(12, false);
        });
    }




    tidyDecimalsOfPoints(decimalsPlaces = 6, resetFixed = true) {
        let oldPointsLocations;
        if (this.lastPointListString !== "") oldPointsLocations = JSON.parse(this.lastPointListString);
        //console.log(oldPointsLocations);
        this.points.forEach(p => {
            //console.log(p);
            if (resetFixed) p.fixed = false;
            //check if the point is a string
            // get the point from the old points list
            // if the point location has moved more than 0.00001 then average the current 
            // point position wih the old point position

            if (oldPointsLocations !== undefined) {
                let oldPoint = oldPointsLocations.find((op) => op.id === p.id);
                if (oldPoint !== undefined) {
                    let oldPointLocation = new Point(oldPoint.id, oldPoint.x, oldPoint.y);
                    let distanceMoved = distance(p, oldPointLocation);
                    if (distanceMoved > 0.00001) {
                        p.x = (p.x + oldPointLocation.x) / 2;
                        p.y = (p.y + oldPointLocation.y) / 2;
                        p.fixed = true;
                    }
                }
            }

            if (typeof p.x === "string") p.x = parseFloat(p.x);
            if (typeof p.y === "string") p.y = parseFloat(p.y);
            if (p.x === null) p.x = 0;
            if (p.y === null) p.y = 0;

            p.x = Math.round(p.x * Math.pow(10, decimalsPlaces)) / Math.pow(10, decimalsPlaces);
            p.y = Math.round(p.y * Math.pow(10, decimalsPlaces)) / Math.pow(10, decimalsPlaces);
        });
    }


    lastPointListString = "";


    solve(iterations = 100) {
        // loop through all constraints and clear any existing errors.
        this.constraints.forEach(c => c.error = null);

        //let impliedConstraints = [];
        // loop through each geometry element and console log the points that it references
        this.geometries.forEach(g => {
            if (g.type === "line") {
                //console.log("line", g.points.map(id => this.points.find(p => p.id === id)));
            }
            if (g.type === "circle") {
                //console.log("circle", g.points.map(id => this.points.find(p => p.id === id)));
            }
            if (g.type === "arc") {
                //console.log(g)
                let maxId = Math.max(...sketchObject.constraints.map((c) => c.id), 0) + 1;
                const TempId = maxId;
                this.constraints.push({
                    // equal distance between points 1 and 2 and points 2 and 3
                    type: "⇌",
                    points: [g.points[0], g.points[1], g.points[0], g.points[2]],
                    temporary: true,
                    id: TempId,
                    labelX: 0,
                    labelY: 0,
                })
                //console.log(this.constraints);
            }
            //console.log(g.points.map(id => this.points.find(p => p.id === id)));
        });


        this.tidyDecimalsOfPoints(6, true);

        this.processConstraintsOfType("⏚");
        //this.processConstraintsOfType("all");

        for (let i = 0; i < this.points.length; i++) {
            this.processConstraintsOfType("≡");
        }

        const constraintTypes = [
            "━",
            "│",
            "⏛",
            "⋱",
            "⟺",
            "⇌",
            "∠",
            "⟂",
            "∥",
            "⇌",
            "⟺",
            "⇌",
            "⟺",
            "⇌",
        ];

        let convergence = false;

        for (let i = 0; i < iterations; i++) {
            let pointsMatchTestString = JSON.stringify(this.points);
            this.lastPointListString = pointsMatchTestString;
            constraintTypes.forEach(type => {
                this.processConstraintsOfType(type);
                this.processConstraintsOfType("≡");
                this.processConstraintsOfType("━");
                this.processConstraintsOfType("|");
            });
        }

        if (!convergence) {
            //console.log("Did not converge after " + iterations + " iterations");
            console.log("Did not converge after " + iterations + " iterations");
        }

        this.tidyDecimalsOfPoints(6);
        this.processConstraintsOfType("⏚");
        this.processConstraintsOfType("≡");
        this.tidyDecimalsOfPoints(6, false);

        // Remove temporary constraints
        this.constraints = this.constraints.filter(c => !c.temporary);


        const updatedSketch = {
            points: this.points.map(p => ({ id: p.id, x: p.x, y: p.y, fixed: p.fixed })),
            constraints: this.constraints,
            geometries: this.geometries
        };

        return JSON.parse(JSON.stringify(updatedSketch));
    }
}



function simplifyCoincidentConstraints() {
    // Step 1: Identify coincident constraints and group points
    let data = sketchObject;
    const coincidentGroups = {};
    const pointToGroup = {};

    data.constraints.forEach(constraint => {
        if (constraint.type === "≡") {
            const [p1, p2] = constraint.points;
            if (!coincidentGroups[p1]) coincidentGroups[p1] = new Set();
            if (!coincidentGroups[p2]) coincidentGroups[p2] = new Set();

            coincidentGroups[p1].add(p2);
            coincidentGroups[p2].add(p1);
        }
    });

    // Merge groups that share common points
    for (const [point, group] of Object.entries(coincidentGroups)) {
        for (const otherPoint of group) {
            if (coincidentGroups[otherPoint]) {
                for (const p of coincidentGroups[otherPoint]) {
                    group.add(p);
                    coincidentGroups[p] = group;
                }
            }
        }
    }

    // Map each point to its group's minimum ID
    for (const [point, group] of Object.entries(coincidentGroups)) {
        const minId = Math.min(...Array.from(group));
        pointToGroup[point] = minId;
    }

    // Step 2: Replace IDs in constraints and geometries
    data.constraints.forEach(constraint => {
        constraint.points = constraint.points.map(p => pointToGroup[p] || p);
    });

    data.geometries.forEach(geometry => {
        geometry.points = geometry.points.map(p => pointToGroup[p] || p);
    });

    discardUnusedPoints();

    // remove all coincident constraint that have the same point twice
    data.constraints = data.constraints.filter(c => !(c.type === "≡" && c.points[0] === c.points[1]));

    return data;
}


function discardUnusedPoints() {
    let data = sketchObject;
    const usedPoints = new Set();

    // Collect points that are used in constraints
    data.constraints.forEach(constraint => {
        constraint.points.forEach(pointId => {
            usedPoints.add(pointId);
        });
    });

    // Collect points that are used in geometries
    data.geometries.forEach(geometry => {
        geometry.points.forEach(pointId => {
            usedPoints.add(pointId);
        });
    });

    // Filter out points that are not used
    data.points = data.points.filter(point => usedPoints.has(point.id));

    return data;
}





















// Constraint defintioons ------------------------------------------------------------------------------------------------------------------------------

constraintFunctions["━"] = function (solverObject, constraint, points, constraintValue) {
    // Horizontal constraint
    if (!points[0].fixed && !points[1].fixed) {
        const avgY = (points[0].y + points[1].y) / 2;
        points[0].y = avgY;
        points[1].y = avgY;
    } else if (!points[0].fixed) {
        points[0].y = points[1].y;
    } else if (!points[1].fixed) {
        points[1].y = points[0].y;
    }
}

constraintFunctions["│"] = function (solverObject, constraint, points, constraintValue) {
    // Vertical constraint
    if (!points[0].fixed && !points[1].fixed) {
        const avgX = (points[0].x + points[1].x) / 2;
        points[0].x = avgX;
        points[1].x = avgX;
    } else if (!points[0].fixed) {
        points[0].x = points[1].x;
    } else if (!points[1].fixed) {
        points[1].x = points[0].x;
    }
}


constraintFunctions["⟺"] = function (solverObject, constraint, points, constraintValue) {
    // Distance constraint
    const [pointA, pointB] = points;
    const targetDistance = constraintValue;
    let dx = pointB.x - pointA.x;
    let dy = pointB.y - pointA.y;
    const currentDistance = Math.sqrt(dx * dx + dy * dy);
    const diff = Math.abs(targetDistance) - currentDistance;
    if (Math.abs(diff) === 0) return;
    const ratio = diff / currentDistance;

    const offsetX = dx * ratio * 0.5;
    const offsetY = dy * ratio * 0.5;

    const direction = targetDistance >= 0 ? 1 : -1;

    if (!pointA.fixed && !pointB.fixed) {
        pointA.x -= offsetX * direction;
        pointA.y -= offsetY * direction;
        pointB.x += offsetX * direction;
        pointB.y += offsetY * direction;
    } else if (!pointA.fixed) {
        pointA.x -= offsetX * 2 * direction;
        pointA.y -= offsetY * 2 * direction;
    } else if (!pointB.fixed) {
        pointB.x += offsetX * 2 * direction;
        pointB.y += offsetY * 2 * direction;
    } else {
        return constraint.error = "points ${pointA.id} and ${pointB.id} are both fixed";
    }
    return;
}



constraintFunctions["⇌"] = function (solverObject, constraint, points, constraintValue) {
    // Equal Distance constraint
    const [pointA, pointB, pointC, pointD] = points;

    // check if either line has a distance constraint applied to it
    // if so, then the line is not moving
    let line1DistanceConstraint = solverObject.constraints.find(c => c.type === "⟺" && c.points.includes(pointA.id) && c.points.includes(pointB.id));
    let line2DistanceConstraint = solverObject.constraints.find(c => c.type === "⟺" && c.points.includes(pointC.id) && c.points.includes(pointD.id));

    let avgDistance = null;
    let line1moving = false;
    let line2moving = false;
    if (!(line1DistanceConstraint) && !(line2DistanceConstraint)) {
        // Calculate the current distances
        const distanceAB = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
        const distanceCD = Math.sqrt(Math.pow(pointD.x - pointC.x, 2) + Math.pow(pointD.y - pointC.y, 2));
        avgDistance = (distanceAB + distanceCD) / 2;
        line1moving = true;
        line2moving = true;
    } else if (line1DistanceConstraint && !line2DistanceConstraint) {
        avgDistance = line1DistanceConstraint.value;
        line2moving = true;
    } else if (line2DistanceConstraint && !line1DistanceConstraint) {
        avgDistance = line2DistanceConstraint.value;
        line1moving = true;
    } else if (line1DistanceConstraint && line2DistanceConstraint) {
        console.log(constraint, "Both lines have a distance constraint applied to them")
        return constraint.error = "Both lines have a distance constraint applied to them";
    }


    if (line1moving) {
        let result1 = constraintFunctions["⟺"](solverObject, constraint, [pointA, pointB], avgDistance);
        if (result1) return result1;
    }

    if (line2moving) {
        let result2 = constraintFunctions["⟺"](solverObject, constraint, [pointC, pointD], avgDistance);
        if (result2) return result2;
    }

}

constraintFunctions["∥"] = function (solverObject, constraint, points, constraintValue) {
    // Parallel constraint
    // check if either line has a vertical or horizontal constraint applied to it
    // if so simply apply the vertical or horizontal constraint to the other line
    let line1VerticalConstraint = solverObject.constraints.find(c => c.type === "│" && c.points.includes(points[0].id) && c.points.includes(points[1].id));
    let line1HorizontalConstraint = solverObject.constraints.find(c => c.type === "━" && c.points.includes(points[0].id) && c.points.includes(points[1].id));
    let line2VerticalConstraint = solverObject.constraints.find(c => c.type === "│" && c.points.includes(points[2].id) && c.points.includes(points[3].id));
    let line2HorizontalConstraint = solverObject.constraints.find(c => c.type === "━" && c.points.includes(points[2].id) && c.points.includes(points[3].id));

    if (line1VerticalConstraint) {
        if (line2VerticalConstraint) {
            return constraint.error = "Both lines have a vertical constraint applied to them";
        } else if (line2HorizontalConstraint) {
            return constraint.error = "One line has a vertical constraint and the other has a horizontal constraint";
        } else {
            let result = constraintFunctions["│"](solverObject, constraint, [points[2], points[3]], 0);
            if (result) return result;
        }
    } else if (line1HorizontalConstraint) {
        if (line2VerticalConstraint) {
            return constraint.error = "One line has a vertical constraint and the other has a horizontal constraint";
        } else if (line2HorizontalConstraint) {
            return constraint.error = "Both lines have a horizontal constraint applied to them";
        } else {
            let result = constraintFunctions["━"](solverObject, constraint, [points[2], points[3]], 0);
            if (result) return result;
        }
    } else if (line2VerticalConstraint) {
        let result = constraintFunctions["│"](solverObject, constraint, [points[0], points[1]], 0);
        if (result) return result;
    } else if (line2HorizontalConstraint) {
        let result = constraintFunctions["━"](solverObject, constraint, [points[0], points[1]], 0);
        if (result) return result;
    } else {
        return constraintFunctions["∠"](solverObject, constraint, points, 180)
    }
}
constraintFunctions["⟂"] = function (solverObject, constraint, points, constraintValue) {
    // Perpendicular constraint
    // check if either line has a vertical or horizontal constraint applied to it
    // if so simply apply the vertical or horizontal constraint to the other line
    let line1VerticalConstraint = solverObject.constraints.find(c => c.type === "│" && c.points.includes(points[0].id) && c.points.includes(points[1].id));
    let line1HorizontalConstraint = solverObject.constraints.find(c => c.type === "━" && c.points.includes(points[0].id) && c.points.includes(points[1].id));
    let line2VerticalConstraint = solverObject.constraints.find(c => c.type === "│" && c.points.includes(points[2].id) && c.points.includes(points[3].id));
    let line2HorizontalConstraint = solverObject.constraints.find(c => c.type === "━" && c.points.includes(points[2].id) && c.points.includes(points[3].id));

    if (line1VerticalConstraint) {
        if (line2VerticalConstraint) {
            return constraint.error = "Both lines have a vertical constraint applied to them";
        } else if (line2HorizontalConstraint) {
            return constraint.error = "One line has a vertical constraint and the other has a horizontal constraint";
        } else {
            let result = constraintFunctions["━"](solverObject, constraint, [points[2], points[3]], 0);
            if (result) return result;
        }
    } else if (line1HorizontalConstraint) {
        if (line2VerticalConstraint) {
            return constraint.error = "One line has a vertical constraint and the other has a horizontal constraint";
        } else if (line2HorizontalConstraint) {
            return constraint.error = "Both lines have a horizontal constraint applied to them";
        } else {
            let result = constraintFunctions["│"](solverObject, constraint, [points[2], points[3]], 0);
            if (result) return result;
        }
    } else if (line2VerticalConstraint) {
        let result = constraintFunctions["━"](solverObject, constraint, [points[0], points[1]], 0);
        if (result) return result;
    } else if (line2HorizontalConstraint) {
        let result = constraintFunctions["│"](solverObject, constraint, [points[0], points[1]], 0);
        if (result) return result;
    } else {
        return constraintFunctions["∠"](solverObject, constraint, points, 90)
    }
}


constraintFunctions["∠"] = function (solverObject, constraint, points, constraintValue) {
    // Angle constraint
    //console.log(points)
    const [p1, p2, p3, p4] = points;
    const targetAngle = constraintValue;

    let line1Angle = calculateAngle(p1, p2);
    let line2Angle = calculateAngle(p3, p4);

    // Normalize angles to [-180, 180)
    line1Angle = (line1Angle + 180) % 360 - 180;
    line2Angle = (line2Angle + 180) % 360 - 180;

    let differenceBetweenAngles = line1Angle - line2Angle;

    // Normalize difference to 
    differenceBetweenAngles = (differenceBetweenAngles + 360) % 360;

    if (Math.abs(targetAngle - differenceBetweenAngles) < tolerance) {
        // Angles are close enough
        // console.log("good");
    } else {
        let line1Moving = !(p1.fixed && p2.fixed);
        let line2Moving = !(p3.fixed && p4.fixed);

        // check if line 1 or line 2 have a vertical or horizontal constraint applied to them
        // if so, then the line is not moving
        if (participateInConstraint(solverObject, "━", [p1, p2])) line1Moving = false;
        if (participateInConstraint(solverObject, "━", [p3, p4])) line2Moving = false;
        if (participateInConstraint(solverObject, "│", [p1, p2])) line1Moving = false;
        if (participateInConstraint(solverObject, "│", [p3, p4])) line2Moving = false;


        let angleDifference = targetAngle - differenceBetweenAngles;
        if (line1Moving && line2Moving) angleDifference /= 2;


        angleDifference = (angleDifference + 360) % 360;

        if (line1Moving) {
            if (p1.fixed) {
                rotatePoint(p1, p2, angleDifference);
            } else if (p2.fixed) {
                rotatePoint(p2, p1, angleDifference);
            } else if (!p1.fixed && !p2.fixed) {
                coinToss() ? rotatePoint(p1, p2, angleDifference) : rotatePoint(p2, p1, angleDifference);
            }
        }

        // flip the angle for adjusting the second line
        angleDifference = -angleDifference;

        if (line2Moving) {
            if (p3.fixed) {
                rotatePoint(p3, p4, angleDifference);
            } else if (p4.fixed) {
                rotatePoint(p4, p3, angleDifference);
            } else if (!p3.fixed && !p4.fixed) {
                coinToss() ? rotatePoint(p3, p4, angleDifference) : rotatePoint(p4, p3, angleDifference);
            }
        }
    }

    return;
}


constraintFunctions["≡"] = function (solverObject, constraint, points, constraintValue) {
    // Coincident constraint
    const [point1, point2] = points;


    if (point1.fixed && point2.fixed) {
        if (participateInConstraint(solverObject, "⏚", [points[0]]) && participateInConstraint(solverObject, "⏚", [points[1]])) {
            constraint.error = "Both points are fixed";
        }
        return;
    }

    if (point1.x === point2.x && point1.y === point2.y) {
        // console.log("points are coincident");
    }
    else {
        if (!point1.fixed && !point2.fixed) {
            // If both points are not fixed, average their coordinates
            const avgX = (point1.x + point2.x) / 2;
            const avgY = (point1.y + point2.y) / 2;
            point1.x = avgX;
            point1.y = avgY;
            point2.x = avgX;
            point2.y = avgY;
        } else if (!point1.fixed) {
            point1.x = point2.x;
            point1.y = point2.y;
            point1.fixed = true;
        } else if (!point2.fixed) {
            point2.x = point1.x;
            point2.y = point1.y;
            point2.fixed = true;
        }

    }
    if (point1.fixed || point2.fixed) {
        point1.fixed = true;
        point2.fixed = true;
    }
}



constraintFunctions["⏛"] = function (solverObject, constraint, points, constraintValue) {
    const [pointA, pointB, pointC] = points;


    // simplify the constraint if possible for vertical and horizontal lines
    if (participateInConstraint(solverObject, "━", [pointA, pointB])) return constraintFunctions["━"](solverObject, constraint, [pointA, pointC], 0);
    if (participateInConstraint(solverObject, "━", [pointA, pointC])) return constraintFunctions["━"](solverObject, constraint, [pointA, pointB], 0);
    if (participateInConstraint(solverObject, "━", [pointB, pointC])) return constraintFunctions["━"](solverObject, constraint, [pointB, pointA], 0);

    if (participateInConstraint(solverObject, "│", [pointA, pointB])) return constraintFunctions["│"](solverObject, constraint, [pointA, pointC], 0);
    if (participateInConstraint(solverObject, "│", [pointA, pointC])) return constraintFunctions["│"](solverObject, constraint, [pointA, pointB], 0);
    if (participateInConstraint(solverObject, "│", [pointB, pointC])) return constraintFunctions["│"](solverObject, constraint, [pointB, pointA], 0);




    // Calculate the direction vector of the line and normalize it
    let dirX = pointB.x - pointA.x;
    let dirY = pointB.y - pointA.y;
    const mag = Math.sqrt(dirX * dirX + dirY * dirY);
    dirX /= mag;
    dirY /= mag;

    // Calculate the vector from pointA to pointC
    const vecX = pointC.x - pointA.x;
    const vecY = pointC.y - pointA.y;

    // Calculate the projection of pointC onto the line
    const t = (vecX * dirX + vecY * dirY);
    const projX = pointA.x + t * dirX;
    const projY = pointA.y + t * dirY;

    // Check if pointC is already on the line
    if (Math.abs(projX - pointC.x) < 1e-6 && Math.abs(projY - pointC.y) < 1e-6) return;

    // Get the distance from the fixed point to pointC
    const distanceToA = distance(pointA, pointC);
    const distanceToB = distance(pointB, pointC);

    let centerX, centerY;

    // Choose a center point based on which points are fixed
    if (pointA.fixed) {
        centerX = pointA.x;
        centerY = pointA.y;
    } else if (pointB.fixed) {
        centerX = pointB.x;
        centerY = pointB.y;
    } else {
        // If neither is fixed, we choose the one that's closer to point C
        if (distanceToA < distanceToB) {
            centerX = pointA.x;
            centerY = pointA.y;
        } else {
            centerX = pointB.x;
            centerY = pointB.y;
        }
    }

    // Calculate a new position for pointC such that it lies on the line and maintains its distance from the center point
    const adjustedDirX = projX - centerX;
    const adjustedDirY = projY - centerY;
    const magAdjusted = Math.sqrt(adjustedDirX * adjustedDirX + adjustedDirY * adjustedDirY);

    // Potential new positions for pointC
    const newX = centerX + (adjustedDirX / magAdjusted) * distanceToA;
    const newY = centerY + (adjustedDirY / magAdjusted) * distanceToA;

    const newAltX = centerX - (adjustedDirX / magAdjusted) * distanceToA;
    const newAltY = centerY - (adjustedDirY / magAdjusted) * distanceToA;

    // Choose the point that minimizes displacement from the original position
    const distNew = distance({ x: newX, y: newY }, pointC);
    const distNewAlt = distance({ x: newAltX, y: newAltY }, pointC);

    if (distNew < distNewAlt) {
        pointC.x = newX;
        pointC.y = newY;
    } else {
        pointC.x = newAltX;
        pointC.y = newAltY;
    }
}




constraintFunctions["⏚"] = function (solverObject, constraint, points, constraintValue) {
    // Fixed constraint
    points[0].fixed = true;
}





function participateInConstraint(solverObject, constraintType, points) {
    return solverObject.constraints.some(c => {
        return c.type === constraintType && points.every(point => c.points.includes(point.id));
    });
}











// Math helpers ------------------------------------------------------------------------------------------------------------------------------
export function getIntersectionPoint(point1, point2, point3, point4, offset = 0) {
    // Original Line 1 points
    let x1 = point1.x, y1 = point1.y;
    let x2 = point2.x, y2 = point2.y;

    // Original Line 2 points
    let x3 = point3.x, y3 = point3.y;
    let x4 = point4.x, y4 = point4.y;

    // Calculate direction vectors
    let dir1 = { x: x2 - x1, y: y2 - y1 };
    let dir2 = { x: x4 - x3, y: y4 - y3 };

    // Normalize direction vectors
    let mag1 = Math.sqrt(dir1.x * dir1.x + dir1.y * dir1.y);
    let mag2 = Math.sqrt(dir2.x * dir2.x + dir2.y * dir2.y);

    let unitDir1 = { x: dir1.x / mag1, y: dir1.y / mag1 };
    let unitDir2 = { x: dir2.x / mag2, y: dir2.y / mag2 };

    // Calculate offset points for Line 1
    let offsetPoint1 = { x: x1 + offset * unitDir1.y, y: y1 - offset * unitDir1.x };
    let offsetPoint2 = { x: x2 + offset * unitDir1.y, y: y2 - offset * unitDir1.x };

    // Calculate offset points for Line 2
    let offsetPoint3 = { x: x3 - offset * unitDir2.y, y: y3 + offset * unitDir2.x };
    let offsetPoint4 = { x: x4 - offset * unitDir2.y, y: y4 + offset * unitDir2.x };

    // Calculate line equations Ax + By = C for offset lines
    let A1 = offsetPoint2.y - offsetPoint1.y;
    let B1 = offsetPoint1.x - offsetPoint2.x;
    let C1 = A1 * offsetPoint1.x + B1 * offsetPoint1.y;

    let A2 = offsetPoint4.y - offsetPoint3.y;
    let B2 = offsetPoint3.x - offsetPoint4.x;
    let C2 = A2 * offsetPoint3.x + B2 * offsetPoint3.y;

    // Calculate intersection
    let det = A1 * B2 - A2 * B1;
    if (det === 0) {
        return null; // Lines are parallel
    } else {
        let x = (B2 * C1 - B1 * C2) / det;
        let y = (A1 * C2 - A2 * C1) / det;
        return { x, y };
    }
}






export function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}






export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = angleInDegrees * Math.PI / 180.0;  // Removed the - 90
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}


export function describeArc(x, y, radius, startAngle, endAngle) {
    if (startAngle === endAngle) {
        // Draw a full circle as two arcs (SVG doesn't allow a single arc to draw a full circle)
        return [
            "M", x + radius, y,
            "A", radius, radius, 0, 0, 1, x - radius, y,
            "A", radius, radius, 0, 0, 1, x + radius, y
        ].join(" ");
    } else {
        const start = polarToCartesian(x, y, radius, startAngle);
        const end = polarToCartesian(x, y, radius, endAngle);
        const largeArcFlag = ((endAngle - startAngle) + 360) % 360 <= 180 ? "0" : "1";
        const sweepFlag = "1"; // Always draw the arc in a "positive-angle" direction

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
        ].join(" ");
    }
}

export function findMidpointOnArc(x, y, radius, startAngle, endAngle) {
    if (startAngle === endAngle) {
        // For a full circle, the midpoint is the center
        return { x: x, y: y };
    } else {
        const adjustedStartAngle = startAngle % 360;
        const adjustedEndAngle = endAngle % 360;
        let midpointAngle;

        if (adjustedStartAngle <= adjustedEndAngle) {
            midpointAngle = (adjustedStartAngle + adjustedEndAngle) / 2;
        } else {
            // Handle the case where the arc crosses the 0-degree line
            midpointAngle = ((adjustedStartAngle + adjustedEndAngle + 360) / 2) % 360;
        }

        return polarToCartesian(x, y, radius, midpointAngle);
    }
}
export function calculateAngle(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return (angle + 360) % 360; // Normalize to [0, 360)
}

export function rotatePoint(center, point, angleDeg) {
    const angleRad = (angleDeg % 360) * (Math.PI / 180); // Normalize to [0, 360)
    const { x: x1, y: y1 } = center;
    const { x: x2, y: y2 } = point;
    const xRotated = (x2 - x1) * Math.cos(angleRad) - (y2 - y1) * Math.sin(angleRad) + x1;
    const yRotated = (x2 - x1) * Math.sin(angleRad) + (y2 - y1) * Math.cos(angleRad) + y1;
    point.x = xRotated;
    point.y = yRotated;
    return { x: xRotated, y: yRotated };
}



export function offsetLine(arrayOfPoints, distance) {
    // Extract the points from the array
    const [point1, point2] = arrayOfPoints;

    // Calculate the direction vector of the line
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;

    // Normalize the direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const dxNormalized = dx / length;
    const dyNormalized = dy / length;

    // Calculate the offset vector
    const dxOffset = dyNormalized * distance;
    const dyOffset = -dxNormalized * distance;

    // Create the new offset points
    const offsetPoint1 = { x: point1.x + dxOffset, y: point1.y + dyOffset };
    const offsetPoint2 = { x: point2.x + dxOffset, y: point2.y + dyOffset };

    // Return the new offset points in an array
    return [offsetPoint1, offsetPoint2];
}



export function coinToss() {
    return Math.random() < 0.5;
}


export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }

    return array;
}



export function roundToDecimals(number, decimals) {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}



export function calcPerpendicularDistanceLineToPoint(linePoints, point) {
    const [pointA, pointB] = linePoints;

    // Calculate the direction vector of the line
    const dirX = pointB.x - pointA.x;
    const dirY = pointB.y - pointA.y;

    // Calculate the vector from pointA to the point
    const vecX = point.x - pointA.x;
    const vecY = point.y - pointA.y;

    // Calculate the projection of the point onto the line
    const t = (vecX * dirX + vecY * dirY) / (dirX * dirX + dirY * dirY);
    const projX = pointA.x + t * dirX;
    const projY = pointA.y + t * dirY;

    // Calculate the vector from the point to its projection on the line
    const perpX = projX - point.x;
    const perpY = projY - point.y;

    // Calculate the perpendicular distance
    const perpDistance = Math.sqrt(perpX * perpX + perpY * perpY);

    // Calculate the cross product to determine the side
    const crossProduct = dirX * vecY - dirY * vecX;

    // Use the sign of the cross product to set the sign of the distance
    const signedPerpDistance = crossProduct >= 0 ? perpDistance : -perpDistance;

    return signedPerpDistance * -1;
}


/// take an array of points and return the average point
export function averagePoint(points) {
    let x = 0;
    let y = 0;
    points.forEach(p => {
        x += p.x;
        y += p.y;
    });
    return { x: x / points.length, y: y / points.length };
}

// Function to calculate the intersection point of two lines
export function lineIntersection(line1, line2) {
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line1;
    const [{ x: x3, y: y3 }, { x: x4, y: y4 }] = line2;

    const det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (det === 0) return null; // Lines are parallel

    const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / det;
    const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / det;

    return { x: px, y: py };
}

export function findArcIntersections(centerPoint, radius, line) {
    const [point1, point2] = line;

    // Check if the line is vertical (x1 === x2) or horizontal (y1 === y2)
    if (point1.x === point2.x) {
        // Vertical line, solve for x directly
        const x = point1.x;
        const y1 = centerPoint.y + Math.sqrt(radius * radius - (x - centerPoint.x) * (x - centerPoint.x));
        const y2 = centerPoint.y - Math.sqrt(radius * radius - (x - centerPoint.x) * (x - centerPoint.x));
        return [{ x, y: y1 }, { x, y: y2 }];
    } else if (point1.y === point2.y) {
        // Horizontal line, solve for y directly
        const y = point1.y;
        const x1 = centerPoint.x + Math.sqrt(radius * radius - (y - centerPoint.y) * (y - centerPoint.y));
        const x2 = centerPoint.x - Math.sqrt(radius * radius - (y - centerPoint.y) * (y - centerPoint.y));
        return [{ x: x1, y }, { x: x2, y }];
    }

    // For non-vertical and non-horizontal lines, continue with your existing code
    const m = (point2.y - point1.y) / (point2.x - point1.x);
    const b = point1.y - m * point1.x;

    const h = centerPoint.x;
    const k = centerPoint.y;

    const a = 1 + m * m;
    const b2 = 2 * (m * (b - k) - h);
    const c = h * h + (b - k) * (b - k) - radius * radius;

    const discriminant = b2 * b2 - 4 * a * c;

    if (discriminant < 0) {
        return [];  // No intersection
    }

    const x1 = (-b2 + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b2 - Math.sqrt(discriminant)) / (2 * a);

    const y1 = m * x1 + b;
    const y2 = m * x2 + b;

    return [
        { x: x1, y: y1 },
        { x: x2, y: y2 }
    ];
}