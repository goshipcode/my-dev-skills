package goshipcode.mydevskills;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {

    private Service service;

    @Autowired
    public Controller(Service service) {
        this.service = service;
    }

    @GetMapping("/skills/{userId}")
    @CrossOrigin
    ResponseEntity<Skills> get(@PathVariable String userId) {
        Skills skills = service.getSkills(userId);
        if (skills == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(skills);
    }

    @GetMapping("/skills/publicurl/{uniqueUrl}")
    @CrossOrigin
    ResponseEntity<Skills> getByUniqueUrl(@PathVariable String uniqueUrl) {
        Skills skills = service.getSkillsByUniqueUrl(uniqueUrl);

        if (skills == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(skills);
    }

    @PostMapping("/skills")
    @CrossOrigin
    void post(@RequestBody @Valid Skills skills) {
        service.saveSkills(skills);
    }
}

