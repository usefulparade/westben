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
    this.plant;

    this.newest = false;

    this.show = function(){
        push();
            // if this is the current content, put it at the top of the screen
            if (this.isCurrentContent && !contentContainerHidden){
                this.scale = 1;
                if (this.ensembleNum >= 13){
                    this.scale = 0.75;
                }
                if (width < 720){
                    translate(-this.pos.x + width/2, -this.pos.y + slideIn);
                } else {
                    translate(-this.pos.x + width/2, -this.pos.y + slideIn);
                }
                push();
                    fill(foregroundColor);
                    noStroke();
                    rectMode(CENTER);

                    fill(backgroundColor);
                    stroke(backgroundColor);
                    textFont(font);
                    if (width > 720){
                        textSize(18);
                    } else {
                        textSize(14);
                    }
                    if (width < 720){
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
                        rectMode(CORNER);
                        if (this.type == 'concert'){
                            text(this.names.toUpperCase(), this.pos.x+this.size, this.pos.y-35, width/6, 70);
                        } else if (this.type == 'ensemble'){
                            text(this.names.toUpperCase(), this.pos.x+this.size, this.pos.y-35, width/6, 70);
                        } else {
                            text('THE ' + this.type.toUpperCase(), this.pos.x+this.size, this.pos.y-35, width/3-10, 70);
                        }
                    }
                pop();

                // translate(0, sin(this.sinCounter)*5);

                if (this.type == 'Barn'){
                    translate(0, 2);
                } else if (this.type == "Conservancy"){
                    translate(0,5);
                } else if (this.ensembleNum >= 13){
                    translate(0,7);
                }
                
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
            } else if (this.type == 'Campfire'){
                this.campfire();
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
            if (this.scale < 1.5){
                this.scale += 0.175;
            } else {
                this.scale = 1.5;
            }

            

            // while (this.scale < 1.5){
            //     this.scale += 0.1;
            // }
        } else {
            if (this.scale > 1){
                this.scale -= 0.08;
            } else {
                this.scale = 1;
            }

        }   

    };

    this.clicked = function(){

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

    this.campfire = function(){
        push();
            translate(this.pos.x, this.pos.y);
            rotate(0);
            scale(this.scale);
            noFill();
            strokeWeight(4);
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }

            // ellipse(0,0,this.half);
            for(var i=0;i<TWO_PI;i+=TWO_PI/7){
              
                push();
                    rotate(i);
                    translate(0,this.half*0.5);
                    point(0,0);
                pop();
            }

        pop();
    }

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
                        point(-this.half*0.1,this.half*0.5);
                        point(this.half*0.05,this.half*0.6);
                    pop();
                    
                pop();
            }   else if (this.ensembleNum == 7){ // barbra lica
                push();
                    noFill();
                    stroke(accentColors[1]);
                    rectMode(CENTER);
                    rect(0, 0, this.half*0.75, this.half, 7);
                    line(-this.half*0.25, this.half*0.3, 0, this.half*0.3);
                    line(-this.half*0.25, this.half*0.15, 0, this.half*0.15);
                    line(-this.half*0.25, 0, 0, 0);
                    line(-this.half*0.25, -this.half*0.15, 0, -this.half*0.15);

                    line(this.half*0.25, this.half*0.3, this.half*0.15, this.half*0.3);
                    line(this.half*0.25, this.half*0.15, this.half*0.15, this.half*0.15);
                    line(this.half*0.25, 0, this.half*0.15, 0);
                    line(this.half*0.25, -this.half*0.15, this.half*0.15, -this.half*0.15);

                    line(0, -this.half*0.4, 0, -this.half*0.3);
                    line(this.half*0.15, -this.half*0.4, this.half*0.15, -this.half*0.3);
                    line(-this.half*0.15, -this.half*0.4, -this.half*0.15, -this.half*0.3);

                    line(-this.half*0.05, this.half, -this.half*0.05, this.half*0.65);
                    line(this.half*0.05, this.half, this.half*0.05, this.half*0.65);

                pop();
                    
            }   else if (this.ensembleNum == 8){ // fitzgeralds
                push();
                    noFill();
                    stroke(accentColors[1]);
                    translate(0, this.half*0.1);
                    rectMode(CENTER);
                    //scroll
                    rect(0, this.half*0.4, this.half*0.3, this.half*0.5);
                    line(-this.half*0.25, this.half*0.55, -this.half*0.25, this.half*0.25);
                    line(-this.half*0.35, this.half*0.45, -this.half*0.35, this.half*0.35);
                    line(this.half*0.25, this.half*0.55, this.half*0.25, this.half*0.25);
                    line(this.half*0.35, this.half*0.45, this.half*0.35, this.half*0.35);

                    //rest of head
                    rect(0, -this.half*0.3, this.half*0.25, this.half*0.9);

                    //tuning pegs
                    line(this.half*0.25, 0, this.half*0.15, 0);
                    line(-this.half*0.25, -this.half*0.2, -this.half*0.15, -this.half*0.2);
                    line(this.half*0.25, -this.half*0.4, this.half*0.15, -this.half*0.4);
                    line(-this.half*0.25, -this.half*0.6, -this.half*0.15, -this.half*0.6);

                    arc(this.half*0.4, 0, this.half*0.3, this.half*0.3, -QUARTER_PI, HALF_PI+QUARTER_PI);
                    ellipse(-this.half*0.4, -this.half*0.2, this.half*0.3, this.half*0.3);
                    ellipse(this.half*0.4, -this.half*0.4, this.half*0.3, this.half*0.3);
                    arc(-this.half*0.4, -this.half*0.6, this.half*0.3, this.half*0.3, HALF_PI+QUARTER_PI, PI+HALF_PI+QUARTER_PI);


                pop();
                    
            }  else if (this.ensembleNum == 9){ // new orford string quartet
                push();
                    push();
                                                //wave 1
                        noFill();
                        stroke(accentColors[1]);
                        translate(0, -this.half*0.5);
                        rectMode(CENTER);
                        beginShape();
                            for (i=-this.half*0.5; i<=this.half*0.5; i+=this.half*0.05){
                                vertex(i, sin(i+frameCount*0.1)*this.half*0.1);
                            }

                        endShape();
                    pop();

                    push();
                                                //wave 2
                        noFill();
                        stroke(accentColors[1]);
                        translate(0, -this.half*0.18);
                        rectMode(CENTER);
                        beginShape();
                            for (i=-this.half*0.5; i<=this.half*0.5; i+=this.half*0.1){
                                vertex(i, cos(i+frameCount*0.08)*this.half*0.1);
                            }

                        endShape();
                    pop();

                    push();
                                                //wave 4
                        noFill();
                        stroke(accentColors[1]);
                        translate(0, this.half*0.18);
                        rectMode(CENTER);
                        beginShape();
                            for (i=-this.half*0.5; i<=this.half*0.5; i+=this.half*0.15){
                                vertex(i, cos(i+frameCount*0.06)*this.half*0.1);
                            }

                        endShape();
                    pop();

                    push();
                                                //wave 4
                        noFill();
                        stroke(accentColors[1]);
                        translate(0, this.half*0.5);
                        rectMode(CENTER);
                        beginShape();
                            for (i=-this.half*0.5; i<=this.half*0.6; i+=this.half*0.2){
                                vertex(i, cos(i+frameCount*0.02)*this.half*0.1);
                            }

                        endShape();
                    pop();
                    



                pop();
                    
            } else if (this.ensembleNum == 10){ // ken tizzard

                //goat idea

                push();
                    noFill();
                    stroke(accentColors[1]);
                    translate(-this.half*0.5, this.half*0.25);
                    rectMode(CENTER);
                    push();
                        //goat beard
                        arc(0, this.half*0.1, this.half*0.5, this.half*0.5, 0, HALF_PI);
                        line(0, this.half*0.1, 0, this.half*0.35);

                    pop();

                    //main head
                        //chin
                        line(0, this.half*0.1, -this.half*0.2, this.half*0.1);
                        line(-this.half*0.2, this.half*0.1, -this.half*0.25, -this.half*0.2);
                        //forehead
                        line(-this.half*0.25, -this.half*0.2, this.half*0.5, -this.half*0.65)

                        //ear
                        line(this.half*0.5, -this.half*0.65, this.half, -this.half*0.3);
                        push();
                            translate(this.half*0.8, -this.half*0.4);
                            rotate(QUARTER_PI);
                            arc(0, 0, this.half*0.5, this.half*0.5, 0, PI*0.7);
                        pop();

                        //neck

                        line(this.half*0.3, this.half*0.1, this.half*0.5, this.half*0.1);
                        line(this.half*0.4, this.half*0.1, this.half*0.5, this.half*0.5)
                        line(this.half*0.8, -this.half*0.1, this.half, this.half*0.2);


                        //horn
                        push();
                            translate(this.half*0.75, -this.half*0.4);
                            rotate(PI*1.25);
                            arc(0, 0, this.half*0.75, this.half*0.75, 0, PI*0.6);

                        pop();

                        //eye
                        push();
                        strokeWeight(this.weight*2);
                        point(this.half*0.35, -this.half*0.3);
                        pop();
                    


                pop();


            
                    
            }  else if (this.ensembleNum == 11){ // good lovelies
                push();
                    noFill();
                    stroke(accentColors[1]);

                    push(); // triangle
                        translate(0, -this.half*0.5);
                        triangle(0, -this.half*0.3,
                                -this.half*0.3, this.half*0.2,
                                this.half*0.3, this.half*0.2);
                    pop();
                    push(); // square
                        rectMode(CENTER);
                        rotate(radians(120));
                        translate(0, -this.half*0.5);
                        rect(0, 0, this.half*0.5);
                    pop();
                    push(); // circle
                        rotate(radians(-120));
                        translate(0, -this.half*0.5);
                        ellipse(0, 0, this.half*0.6);
                    pop();
                pop();
            }

        pop();
    };


    this.ensemble = function(){
        this.sinCounter = (this.sinCounter+random(0.001, 0.01))%TWO_PI;
        push();
            translate(this.pos.x, this.pos.y);
            if (this.ensembleNum < 13){
                rotate(this.rotation + this.sinCounter);
            } else {
                rotate(this.rotation);
            }
            scale(this.scale);
            noFill();
            stroke(accentColors[0]);
            strokeWeight(this.weight);
            if (this.ensembleNum < 13){
                ellipse(0, 0, this.size, this.size);
            }
                                                                            // PCR 1 ENSEMBLES (2020)
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

                                                                                // PCR 2 ENSEMBLES (2021)
            } else if (this.ensembleNum >= 13){ 
                push();
                    translate(0, this.half);
                    if (this.over || this.isCurrentContent){
                        this.plant.grow();
                        // console.log(this.plant);
                    }
                    this.plant.show();
                    
                    // rectMode(CENTER);
                    // rect(0, 0, this.half, this.half);
                pop();
                push();
                    // stroke(accentColors[2]);
                    arc(0, 0, this.size, this.size, 0, PI);

                pop();
                push();
                    noStroke();
                    fill(accentColors[2]);
                    // arc(0,0,this.size,this.size,PI*0.1,PI*0.9, CHORD);
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

    this.grow = function(){
        

    }
};

function Branch(begin, end, tree){
    this.begin = begin;
    this.end = end;
    this.progress = p5.Vector.lerp(this.begin, this.end, 0);
    this.grown = false;
    this.lerp = 0;
    this.newCap = false;
    this.parentTree = tree;

    this.spawnA = function(){
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(this.parentTree.theta);
        dir.mult(random(0.75, 0.9));
        var newEnd = p5.Vector.add(this.end, dir);
        var a = new Branch(this.end, newEnd, this.parentTree);
        return a;
    };

    this.spawnB = function(){
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-this.parentTree.theta);
        dir.mult(random(0.75, 0.9));
        var newEnd = p5.Vector.add(this.end, dir);
        var b = new Branch(this.end, newEnd, this.parentTree);
        return b;
    };

    this.show = function(){

        this.progress = p5.Vector.lerp(this.begin, this.end, this.lerp);
        line(this.begin.x, this.begin.y, this.progress.x, this.progress.y);
        
        
    };

    this.grow = function(){
        if (this.lerp < 1){
            this.lerp += 0.05;
        } else {
            this.lerp = 1;
        }
    };

    this.jitter = function(){
        this.end.x += random(-0.03, 0.03);
        this.end.y += random(-0.03, 0.03);
    };

    this.mouseMagnet = function(){
        let mouseVec = createVector(mouseX, mouseY);
        if (p5.Vector.dist(mouseVec, this.begin) < 50){
            var dir = p5.Vector.sub(mouseVec, this.end);
            dir.mult(0.005);
            this.end.add(dir);
        }
    };

}

function Plant(seedPos, dir, col, theta){
    this.branches = [];
    this.a = seedPos.copy();
    this.dir = dir.copy();
    this.b = p5.Vector.add(this.a, createVector(this.dir.x, this.dir.y));
    this.germinated = false;
    this.c = col
    this.alpha = 255;
    this.decayLerp = 0;
    this.allGrown = false;
    this.theta = theta;
    this.skew = random(-10, 10);

    this.germinate = function(){
        this.branches[0] = new Branch(this.a, this.b, this);
        this.germinated = true;
    };

    this.grow = function(){
        for (var i=0;i<this.branches.length;i++){
            this.branches[i].grow();
        }
    }

    this.show = function(){
        push();
            rotate(radians(this.skew));
            strokeWeight(2);
            stroke(accentColors[0]);
            for (var i=0;i<this.branches.length;i++){
                this.branches[i].show();
                this.branches[i].jitter();

                // if (i%2 == 1){
                //     this.branches[i].mouseMagnet();
                // }

               
                if (this.branches[i].lerp >= 1 && !this.branches[i].grown){
                    if (this.branches.length < 100){
                        var probA = random(0,1);
                        var probB = random(0,1);
                        if (this.branches.length < 4){ // make sure it doesn't dead-end right away
                            if (probA < 0.2){
                                probB = 1;
                            } else if (probB < 0.2){
                                probA = 1;
                            }
                        }

                        if (probA >= 0.2){
                            this.branches.push(this.branches[i].spawnA());
                        }
                        if (probB >= 0.2){
                            this.branches.push(this.branches[i].spawnB());
                        }
                    }
                    this.branches[i].grown = true;
                }
                
            }

            if (!this.allGrown){ // if it's not yet fully grown
                let notYet = false;
                for (var j=0;j<this.branches.length;j++){ // loop through branches to check if they're grown
                    if (!this.branches[j].grown){ // if any branch isn't grown yet
                       notYet = true;
                    }
                }
                if (!notYet){
                    this.allGrown = true; // otherwise, everything is grown, so this tree is grown
                }
                
                
            } else { // if the tree has grown
                // this.color = 255;
                this.alpha = 255 - lerp(0, 205, this.decayLerp); // start fading out
                if (this.decayLerp < 1){
                    this.decayLerp += 0.0005;
                }
            }
        pop();
        
    };

}