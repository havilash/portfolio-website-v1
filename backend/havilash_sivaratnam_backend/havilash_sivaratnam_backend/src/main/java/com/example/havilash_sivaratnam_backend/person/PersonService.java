package com.example.havilash_sivaratnam_backend.person;

import ch.bbcag.backend.todolist.FailedValidationException;
import ch.bbcag.backend.todolist.security.AuthRequestDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PersonService {
    private final PersonRepository personRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public PersonService(PersonRepository personRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.personRepository = personRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public PersonResponseDTO create(AuthRequestDTO authRequestDTO) {
        Person person = new Person();
        person.setPassword(bCryptPasswordEncoder.encode(authRequestDTO.getPassword()));
        person.setUsername(authRequestDTO.getUsername());
        return PersonMapper.toResponseDTO(personRepository.save(person));
    }

    public List<PersonResponseDTO> findAll() {
        return personRepository.findAll().stream().map(PersonMapper::toResponseDTO).toList();
    }

    public PersonResponseDTO findById(Integer id) {
        return PersonMapper.toResponseDTO(personRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }

    public PersonResponseDTO findByUsername(String username) {
        return PersonMapper.toResponseDTO(personRepository.findByUsername(username));
    }

    public PersonResponseDTO update(PersonRequestDTO personRequestDTO, Integer id) {
        Person existing = personRepository.findById(id).orElseThrow(EntityNotFoundException::new);

        mergePersons(existing, PersonMapper.fromRequestDTO(personRequestDTO));

        return PersonMapper.toResponseDTO(personRepository.save(existing));
    }

    public void deleteById(Integer id) {
        personRepository.deleteById(id);
    }

    private void mergePersons(Person existing, Person changing) {
        Map<String, List<String>> errors = new HashMap<>();

        if (changing.getUsername() != null) {
            if (StringUtils.isNotBlank(changing.getUsername())) {
                existing.setUsername(changing.getUsername());
            } else {
                errors.put("Username", List.of("Username must not be empty"));
            }
        }
        if (changing.getPassword() != null) {
            if (changing.getPassword().length() >= 6 && changing.getPassword().length() <= 255) {
                String newPassword = bCryptPasswordEncoder.encode(changing.getPassword());
                existing.setPassword(newPassword);
            } else {
                errors.put("password", List.of("Password must be between 6 and 255"));
            }
        }
        if (changing.getItems() != null) {
            existing.setItems(changing.getItems());
        }

        if (!errors.isEmpty()) { throw new FailedValidationException(errors); }
    }
}