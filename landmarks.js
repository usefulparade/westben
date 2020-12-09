var Landmark = function(_pos, _type, _link){
    this.pos = _pos;
    this.x = this.pos.x;
    this.y = this.pos.y;
    this.type = _type;

    if (this.type == 'Barn'){
        this.size = map(((width+height)/2), 500, 1200, 50, 70);
    } else {
        this.size = map(((width+height)/2), 500, 1200, 30, 50);
    }
   
    this.weight = 2;
        
    
    this.scale = 1;
    this.rotation = random(-PI*0.05, PI*0.05);
    this.half = this.size*0.5;
    this.collide = this.size*0.7;
    this.over = false;
    this.caption = "The " + this.type;
    this.link = _link;
    this.linkIsAudio = false;
    this.visited = false;
    this.sinCounter = 0;
    this.names = '';
    this.ensembleNum = 0;
    this.vol = 0;
    this.isCurrentContent = false;
    
    

    this.newest = false;

    this.show = function(){
        push();
            // if this is the current content, put it at the top of the screen
            if (this.isCurrentContent && !contentContainerHidden){
                this.scale = 1;
                if (width < 720){
                    translate(-this.pos.x + width/2, -this.pos.y + slideIn);
                } else {
                    translate(-this.pos.x + width/2, -this.pos.y + slideIn);
                }
                push();
                    fill(foregroundColor);
                    noStroke();
                    // strokeWeight(3);
                    // ellipse(this.pos.x, this.pos.y, this.size*1.8);
                    rectMode(CENTER);
                    // if (width < 720){
                    //     rect(this.pos.x + ((2*width/3) - (width/2)), this.pos.y, 2*width/3, 70);
                    // } else {
                    //     rect(this.pos.x, this.pos.y, width/2, 70);
                    // }


                    fill(backgroundColor);
                    stroke(backgroundColor);
                    textFont(font);
                    if (width > 720){
                        textSize(18);
                    } else {
                        textSize(14);
                    }
                    if (width < 720){
                        // textAlign(LEFT, CENTER);
                        // text("You're at", this.pos.x+this.size*2, this.pos.y - this.half);
                        textAlign(LEFT, CENTER);
                        rectMode(CORNER);
                        if (this.type == 'concert'){
                            text("You're at " + this.names.toUpperCase(), this.pos.x+this.size*1.5, this.pos.y-35, width/3-10, 70);
                        } else if (this.type == 'ensemble'){
                            text("You're at " + this.names.toUpperCase(), this.pos.x+this.size*1.5, this.pos.y-35, width/3-10, 70);
                        } else {
                            text("You're at THE " + this.type.toUpperCase(), this.pos.x+(this.size*1.5), this.pos.y-35, width/3-10, 70);
                        }
                    } else {
                        textAlign(RIGHT, CENTER);
                        text("You're at", this.pos.x-this.size, this.pos.y);
                        textAlign(LEFT, CENTER);
                        if (this.type == 'concert'){
                            text(this.names.toUpperCase(), this.pos.x+this.size, this.pos.y);
                        } else if (this.type == 'ensemble'){
                            text(this.names.toUpperCase(), this.pos.x+this.size, this.pos.y);
                        } else {
                            text('THE ' + this.type.toUpperCase(), this.pos.x+this.size, this.pos.y);
                        }
                    }
                pop();

                translate(0, sin(this.sinCounter)*5);
                if (this.type == 'Barn'){
                    translate(0, 2);
                } else if (this.type == "Conservancy"){
                    translate(0,5);
                }
                // this.sinCounter = (this.sinCounter+random(0.001, 0.01))%TWO_PI;
                
                document.getElementById('caption').innerHTML = '';
                document.getElementById('caption').style.setProperty('display', 'none');
            }

            if (this.newest && !this.visited && contentContainerHidden){
                this.bird();
            }

            if (this.type == 'Barn'){
                this.barn();
            } else if (this.type == 'Conservancy'){
                this.tree();
            } else if (this.type == 'Ticket Shed'){
                this.ticket();
            } else if (this.type == 'maple group'){
                this.maple();
            } else if (this.type == 'Milkshed'){
                this.milk();
            } else if (this.type == 'parking lot'){
                this.parking();
            } else if (this.type == 'pond'){
                this.pond();
            } else if (this.type == 'tractor'){
                this.tractor();
            } else if (this.type == 'concert'){
                this.concert();
            } else {
                this.ensemble();
            }
        pop();

        if (!touchIsDown){
            if (mouseX > this.pos.x-this.collide && mouseX < this.pos.x+this.collide && mouseY > this.pos.y-this.collide && mouseY < this.pos.y+this.collide){
                this.over = true;
            } else {
                this.over = false;
            }
        } else if (touchIsDown){
            if (touches[0] != null){
                if (touches[0].x > this.pos.x-this.collide && touches[0].x < this.pos.x+this.collide && touches[0].y > this.pos.y-this.collide && touches[0].y < this.pos.y+this.collide){
                    this.over = true;
                } else {
                    this.over = false;
                }
            } else {
                this.over = false;
            }
        }

        if (this.over){
            if (contentContainerHidden){
                if (this.names != ''){
                    document.getElementById('caption').innerHTML = this.names;
                    document.getElementById('caption').style.setProperty('display', 'block');
                    // document.getElementById('caption').style.setProperty('animation', 'fadeIn 0.5s ease forwards');
                } else {
                    document.getElementById('caption').innerHTML = this.caption;
                    document.getElementById('caption').style.setProperty('display', 'block');
                    // document.getElementById('caption').style.setProperty('animation', 'fadeOut 0.5s ease forwards');
                }
            }

            this.scale = 1.5;
        } else {
            
            this.scale = 1;

        }   

    };

    this.clicked = function(){

        // loadNewIframeContent(this.link);
        // contentExpand();

        if (this.linkIsAudio){
            
            userStartAudio();
            for (var i in fieldRecordings){
                if (fieldRecordings[i] == this.link){
                    if (fieldRecordings[i].isPlaying()){
                        fieldRecordings[i].stop();
                    } else {
                        fieldRecordings[i].play();
                    }
                    
                }
            }
        } else {
            currentIcon = this;
            loadNewIframeContent(this.link);
            if (this.type == 'concert'){
                // openDonateModal();
            }
            contentExpand();
           
        }

        if (!this.linkIsAudio){
            if (!this.visited){
                totalVisited++;
                this.visited = true;
            }
        }

        if (totalVisited >= 7 && fieldRecordings[2].isLoaded() && lotExists){
            if (!tractorExists){
                makeTractor();
                tractorExists = true;
            }
        }

        if (totalVisited >= 5 && fieldRecordings[1].isLoaded() && lotExists){
            if (!pondExists){
                makePond();
                pondExists = true;
            }
        }

        if (totalVisited >= 3 && fieldRecordings[0].isLoaded()){
            if (!lotExists){
                makeParkingLot();
                lotExists = true;
            }
        }

        
        
    };

    this.barn = function(){
        // this.barnScale = this.scale + 0.5;
        push();
            translate(this.pos.x, this.pos.y + this.half*0.3);
            scale(this.scale);
            noFill();
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }
            strokeWeight(this.weight);
            strokeCap(ROUND);
            strokeJoin(ROUND);
            // MAIN BARN
            beginShape();
                vertex(0, -this.half*0.8);
                vertex(this.half*1.1, 0);
                vertex(this.half-this.size*0.1, 0);
                vertex(this.half-this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, 0);
                vertex(-this.half*1.1, 0);
            endShape(CLOSE);

            // BIG ROOF
            beginShape();
                vertex(-this.half*1.1, 0);
                vertex(-this.half*0.8, -this.half*0.8);
                vertex(0, -this.half*1.3);
                vertex(this.half*0.8, -this.half*0.8);
                vertex(this.half*1.1, 0);
            endShape();

            // SIDE R
            beginShape();
                vertex(this.half*0.8, -this.half*0.8);
                vertex(this.half*1.3, -this.half*0.8);
                vertex(this.half*1.3, this.half*0.5);
                vertex(this.half-this.size*0.1, this.half*0.5);
            endShape();
            // SIDE L
            beginShape();
                vertex(-this.half*0.8, -this.half*0.8);
                vertex(-this.half*1.3, -this.half*0.8);
                vertex(-this.half*1.3, this.half*0.5);
                vertex(-this.half+(this.size*0.1), this.half*0.5);
            endShape();

        
        pop();
    };

    this.tree = function(){

        push();
            
            translate(this.pos.x, this.pos.y-this.half*0.4);
            noFill();
            scale(this.scale);
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }
            strokeWeight(this.weight);
            // ellipse(0, 0, this.size);
            line(0, -this.half, 0, this.size*0.6);
            for (i=0;i<5;i++){
                push();
                    translate(0, i*(this.half/3));
                    line(0, -this.half, -this.half*0.6, -this.half*0.2);
                    line(0, -this.half, this.half*0.6, -this.half*0.2);
                pop();
            }

        
        pop();
    };

    this.ticket = function(){
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation);
            scale(this.scale);
            noFill();
            strokeWeight(this.weight);
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }

            // textFont(font);
            for (i=0;i<5;i++){
                var spacer = i*(this.half*0.4);
                line(-this.half + spacer, -this.half*0.5, -this.half + spacer, this.half*0.5);
            }
        pop();
    };

    this.milk = function(){
        push();
            translate(this.pos.x, this.pos.y);
            rotate(0);
            scale(this.scale);
            noFill();
            strokeWeight(this.weight);
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }

            // front face
            line(0, 0, this.half, -this.half*0.2);
            line(0, 0, 0, this.half);
            line(0, this.half, this.half, this.half-(this.half*0.2));
            line(this.half, this.half-(this.half*0.2), this.half, -this.half*0.2);

            // side face
            line(0, 0, -this.half*0.9, -this.half*0.2);
            line(-this.half*0.9, -this.half*0.2, -this.half*0.9, this.half-(this.half*0.2));
            line(-this.half*0.9, this.half-(this.half*0.2), 0, this.half);

            // triangle
            line(0, 0, -this.half*0.5, -this.half*0.8);
            line(-this.half*0.5, -this.half*0.8, -this.half*0.9, -this.half*0.2);

            // top angle
            line(this.half, -this.half*0.2, this.half*0.5, -this.half*0.9);
            line(this.half*0.5, -this.half*0.9, -this.half*0.5, -this.half*0.8);

            // top tab
            line(-this.half*0.5, -this.half*0.8, -this.half*0.5, -this.half*1.1);
            line(-this.half*0.5, -this.half*1.1, this.half*0.5, -this.half*1.2);
            line(this.half*0.5, -this.half*1.2, this.half*0.5, -this.half*0.9);

        pop();
    };

    this.concert = function(){
        this.sinCounter = (this.sinCounter+random(0.001, 0.01))%TWO_PI;

        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation + this.sinCounter);
            scale(this.scale);
            noFill();
            stroke(accentColors[1]);
            strokeWeight(this.weight);
            ellipse(0, 0, this.size, this.size);

            if (this.ensembleNum == 0){ // bass
                for (i=-this.half*0.5;i<=this.half*0.5;i+=(this.half*0.33)){
                    line(i, -this.half, i, this.half);
                }
            } else if (this.ensembleNum == 1){ // piano
                rectMode(CENTER);
                for (i=0;i<5;i++){
                    var spacer = i*this.half*0.25;
                    rect(-this.half*0.5 + spacer, 0, this.half*0.25, this.half);
                }
                push();
                    translate(-this.half*0.07, 0);
                    rectMode(CORNER);
                    fill(accentColors[1]);
                    rect(-this.half*0.6, 0, this.half*0.1, this.half*0.6);
                    rect(-this.half*0.35, 0, this.half*0.1, this.half*0.6);
                    rect(-this.half*0.1, 0, this.half*0.1, this.half*0.6);
                    rect(this.half*0.4, 0, this.half*0.1, this.half*0.6);
                    rect(this.half*0.65, 0, this.half*0.1, this.half*0.6);
                    
                pop();
            } else if (this.ensembleNum == 2){ // harp
                push();
                    translate(this.half*0.3, 0);
                    rectMode(CORNER);
                    fill(accentColors[1]);
                    noFill();
                    stroke(accentColors[1]);
                    beginShape();
                        vertex(-this.half*0.4, this.half*0.7);
                        vertex(this.half*0.4, -this.half*0.1);
                        quadraticVertex(this.half*0.4, -this.half*0.4, this.half*0.2, -this.half*0.3);
                        quadraticVertex(0, -this.half*0.1, -this.half*0.1, -this.half*0.4);
                        quadraticVertex(-this.half*0.3, -this.half*0.9, -this.half*0.6, -this.half*0.7);
                        vertex(-this.half*0.6, this.half*0.7);
                    endShape(CLOSE);

                    line(-this.half*0.45, -this.half*0.7, -this.half*0.45, this.half*0.7);
                    line(-this.half*0.3, -this.half*0.7, -this.half*0.3, this.half*0.6);
                    line(-this.half*0.15, -this.half*0.5, -this.half*0.15, this.half*0.4);
                    line(0, -this.half*0.2, 0, this.half*0.3);
                    line(this.half*0.15, -this.half*0.25, this.half*0.15, this.half*0.1);
                    line(this.half*0.3, -this.half*0.3, this.half*0.3, 0);
                pop();
            }   else if (this.ensembleNum == 3){ // CHAIR
                push();
                    // back frame
                    noFill();
                    stroke(accentColors[1]);
                    beginShape();

                        
                        vertex(0, this.half*0.7);
                        vertex(-this.half*0.7, -this.half*0.5);
                        vertex(0, -this.half*0.7);
                        vertex(this.half*0.7, this.half*0.5);
                    endShape();
                    
                    //back pad
                    fill(accentColors[1]);
                    noStroke();
                    beginShape();
                        
                        vertex(-this.half*0.7, -this.half*0.5);
                        vertex(0, -this.half*0.7);
                        vertex(this.half*0.18, -this.half*0.4);
                        vertex(-this.half*0.48, -this.half*0.2);
                    endShape();

                    push();
                        translate(-this.half*0.1, 0);
                        //chair pad
                        fill(accentColors[1]);
                        stroke(accentColors[1]);
                        noStroke();
                        beginShape();
                            vertex(this.half*0.2, this.half*0.3);
                            vertex(this.half*0.9, this.half*0.1);
                            vertex(this.half*0.4, -this.half*0.1);
                            vertex(-this.half*0.3, this.half*0.1);
                        endShape(CLOSE);
                        
                        stroke(accentColors[1]);
                        //back legs
                        line(this.half*0.4, -this.half*0.1, this.half*0.4, this.half*0.4);    
                        line(-this.half*0.3, this.half*0.1, -this.half*0.3, this.half*0.6);
                    pop();
                
                pop();
            } else if (this.ensembleNum == 4){ // brian manker
                push();
                    noFill();
                    stroke(accentColors[1]);
                    line(this.half, 0, -this.half, 0);
                    line(-this.half*0.2, this.half, -this.half*0.2, -this.half);
                    line(-this.half*0.067, this.half, -this.half*0.067, -this.half);
                    line(this.half*0.067, this.half, this.half*0.067, -this.half);
                    line(this.half*0.2, this.half, this.half*0.2, -this.half);
                pop();
            } else if (this.ensembleNum == 5){ // jordan mowat
                push();
                    noFill();
                    stroke(accentColors[1]);
                    rectMode(CENTER);
                    rect(0, 0, this.half*0.2, this.half*0.4);
                    line(0, this.half*0.2, 0, this.half*1.5);
                pop();
            }  else if (this.ensembleNum == 6){ // christmas
                push();
                    noFill();
                    stroke(accentColors[1]);
                    beginShape();
                        vertex(0, this.half*0.7);
                        // right side
                        vertex(this.half*0.3, this.half*0.4);
                        vertex(this.half*0.15, this.half*0.4);
                        vertex(this.half*0.4, 0);
                        vertex(this.half*0.2, 0);
                        vertex(this.half*0.5, -this.half*0.4);
                        vertex(this.half*0.1, -this.half*0.4);
                        // trunk
                        vertex(this.half*0.1, -this.half*0.7);
                        vertex(-this.half*0.1, -this.half*0.7);
                        // left side
                        vertex(-this.half*0.1, -this.half*0.4);
                        vertex(-this.half*0.5, -this.half*0.4);
                        vertex(-this.half*0.2, 0);
                        vertex(-this.half*0.4, 0);
                        vertex(-this.half*0.15, this.half*0.4);
                        vertex(-this.half*0.3, this.half*0.4);
                    endShape(CLOSE);

                    push();
                        stroke(lightColors[colorPalette]);
                        strokeWeight(random(1.5,2.5));
                        point(this.half*0.2,-this.half*0.3);
                        point(this.half*0.3,-this.half*0.25);
                        point(-this.half*0.3,-this.half*0.2);
                        point(0,0);
                        point(-this.half*0.2,this.half*0.1);
                        point(this.half*0.25,this.half*0.15);
                        point(-this.half*0.08,this.half*0.3);
                        // point(this.half*0.2,this.half*0.4);
                        point(-this.half*0.1,this.half*0.5);
                        point(this.half*0.05,this.half*0.6);
                    pop();
                    
                pop();
            }

        pop();
    };

    this.ensemble = function(){
        this.sinCounter = (this.sinCounter+random(0.001, 0.01))%TWO_PI;
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation + this.sinCounter);
            scale(this.scale);
            noFill();
            stroke(accentColors[0]);
            strokeWeight(this.weight);
            ellipse(0, 0, this.size, this.size);
            
            if (this.ensembleNum == 0){                 // POINTS
                strokeWeight(5);
                point(this.half*0.3, 0);
            } else if (this.ensembleNum == 1){
                strokeWeight(5);
                point(-this.half*0.3, 0);
                point(this.half*0.3, 0);
            } else if (this.ensembleNum == 2){
                strokeWeight(5);
                point(-this.half*0.3, this.half*0.2);
                point(this.half*0.3, this.half*0.2);
                point(0, -this.half*0.3);
            }  else if (this.ensembleNum == 3){
                strokeWeight(5);
                point(-this.half*0.3, -this.half*0.3);
                point(-this.half*0.3, this.half*0.3);
                point(this.half*0.3, this.half*0.3);
                point(this.half*0.3, -this.half*0.3);
            } else if (this.ensembleNum == 4){          // ONE LINE
                for (i=0;i<1;i++){
                    push();
                    rotate(i * PI/1);
                        line(0, -this.half, 0, this.half);
                    pop();
                }
            }  else if (this.ensembleNum == 5){          // CROSS LINES
                for (i=0;i<2;i++){
                    push();
                    rotate(i * PI/2);
                        line(0, -this.half, 0, this.half);
                    pop();
                }
            }  else if (this.ensembleNum == 6){          // CROSS LINES
                for (i=0;i<3;i++){
                    push();
                    rotate(i * PI/3);
                        line(0, -this.half, 0, this.half);
                    pop();
                }
            }  else if (this.ensembleNum == 7){          // PARALLEL LINES
                    push();
                        line(-this.half*0.33, -this.half*0.9, -this.half*0.33, this.half*0.9);
                        line(this.half*0.33, -this.half*0.9, this.half*0.33, this.half*0.9);
                    pop();
            }  else if (this.ensembleNum == 8){          // PARALLEL LINES
                    push();
                        line(-this.half*0.5, -this.half*0.8, -this.half*0.5, this.half*0.8);
                        line(0, -this.half, 0, this.half);
                        line(this.half*0.5, -this.half*0.8, this.half*0.5, this.half*0.8);
                    pop();
            } else if (this.ensembleNum == 9){          // CONCENTRIC
                    push();
                        ellipse(-this.half*0.5, 0, this.size*0.5);
                    pop();
            } else if (this.ensembleNum == 10){          // CONCENTRIC
                push();
                    ellipse(-this.half*0.33, 0, this.size*0.66);
                    ellipse(-this.half*0.66, 0, this.size*0.33);
                pop();
            } else if (this.ensembleNum == 11){          // TRIANGLE
                push();
                    beginShape();
                        vertex(-this.half*0.6, this.half*0.4);
                        vertex(this.half*0.6, this.half*0.4);
                        vertex(0, -this.half*0.7);
                    endShape(CLOSE);
                pop();
            } else if (this.ensembleNum == 12){          // SQUARE
                push();
                    rectMode(CENTER);
                    rect(0, 0, this.half, this.half);
                pop();
            } else {
                strokeWeight(5);
                point(0, 0);
            }
            
        pop();
    };

    this.pond = function(){
        push();

            translate(this.pos.x, this.pos.y + sin(this.sinCounter)*5);
            rotate(-PI/12);
            scale(this.scale);
            noFill();
            strokeWeight(this.weight);
            stroke(accentColors[2]);

            // ellipse(0, 0, this.size, this.size*0.7);
            arc(-this.half, 0, this.half, this.half, 0, HALF_PI);
            arc(0, 0, this.half, this.half, HALF_PI, PI);
            arc(0, 0, this.half, this.half, 0, HALF_PI);
            arc(this.half, 0, this.half, this.half, HALF_PI, PI);
            arc(this.half, 0, this.half, this.half, 0, HALF_PI);
            arc(this.size, 0, this.half, this.half, HALF_PI, PI);
            
            if (fieldRecordings[1].isPlaying()){
                this.sinCounter += 0.1;
            }
            
        pop();
    };

    this.parking = function(){
        push();
            translate(this.pos.x, this.pos.y + sin(this.sinCounter)*5);
            rotate(0);
            scale(this.scale);
            noFill();
            strokeWeight(this.weight);
            stroke(accentColors[2]);

            quad(this.collide, -this.collide, this.collide, this.collide, -this.collide, this.collide*0.9, -this.collide, -this.collide*0.9);
        
            if (fieldRecordings[0].isPlaying()){
                this.sinCounter += 0.1;
            }

        pop();
    };

    this.tractor = function(){
        push();

            translate(this.pos.x, this.pos.y + sin(this.sinCounter)*5);
            rotate(-PI/12);
            scale(this.scale);

            noFill();
            strokeWeight(this.weight);
            stroke(accentColors[2]);

            //wheels
            ellipse(-this.half, this.half, this.half*0.6, this.half*0.6);
            // ellipse(-this.half, this.half, this.half*0.4);
            ellipse(this.half, this.half*0.8, this.size*0.8);
            // ellipse(this.half, this.half*0.8, this.size*0.4);
            arc(this.half, this.half*0.8, this.size, this.size, -HALF_PI - QUARTER_PI, 0);

            //body

            beginShape();
                vertex(0, -this.half*0.3);
                vertex(-this.half, -this.half*0.3);
                vertex(-this.half, this.half);
                vertex(-this.half*0.5, this.half);
                vertex(0, 0);
            endShape(CLOSE);

            // pipes
            line(-this.half*0.7, -this.half*0.3, -this.half*0.7, -this.half*0.5);
            line(-this.half*0.6, -this.half*0.3, -this.half*0.6, -this.half*0.6);

            // vent
            line(-this.half, 0, -this.half*0.8, 0);
            line(-this.half, this.half*0.1, -this.half*0.8, this.half*0.1);
            line(-this.half, this.half*0.2, -this.half*0.8, this.half*0.2);

            
            if (fieldRecordings[2].isPlaying()){
                this.sinCounter += 0.1;
            }
            
        pop();
    };

    this.bird = function(){
        push();
            
            // translate(0, this.size*2.2 + sin(frameCount*0.1)*5);
            // translate(this.pos.x, this.pos.y - this.size*1.2);
            // noStroke();
            // fill(foregroundColor);
            // rectMode(CENTER);
            // rect(0,0, 50, 30);
            // beginShape();
            //     vertex(5, -15);
            //     vertex(0, -20);
            //     vertex(-5, -15);
            // endShape(CLOSE);
            // fill(backgroundColor);
            // textFont(font);
            // textSize(16);
            // textAlign(CENTER, CENTER);
            // text('NEW!', 0, -2);

            translate(this.pos.x, this.pos.y);
            if (!this.over){
                translate(0, -this.size*0.9);
            } else {
                translate(0, -this.size*1.15);
            }

            scale(0.7);
            // scale(-1, 0);
            noFill();
            stroke(foregroundColor);
            strokeWeight(this.weight*1.3);
            beginShape();
                vertex(0, this.half);
                vertex(0, this.half*0.8);
                quadraticVertex(this.half*0.8, this.half*0.8, 
                                this.half*0.8, this.half*0.2);
                vertex(this.half, this.half*0.2);
                vertex(this.half*0.8, 0);
                quadraticVertex(this.half*0.5, -this.half*0.8, 
                                -this.half*0.8, this.half*0.55);
                vertex(0, this.half*0.8);
            endShape();
        pop();

    };
};