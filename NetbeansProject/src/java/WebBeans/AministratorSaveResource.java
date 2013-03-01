/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebBeans;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import persistence.administratordata;

/**
 * REST Web Service
 *
 * @author pedro
 */
@Path("aministratorSave") //the path to arrive at this webservice
@Stateless //this means this is a stateless EJB!
public class AministratorSaveResource {
    // name of the context of persistence
    @PersistenceContext(name="WebApplication1PU")
    EntityManager em;
    //the entity manager will handle communication with
    //the administration data
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AministratorSaveResource
     */
    public AministratorSaveResource() {
    }

    /**
     * Retrieves representation of an instance of WebBeans.AministratorSaveResource
     * @return an instance of java.lang.String
     */
    @GET //this method will be called during a GET
    @Produces("application/json")
    public String getJson() {
        if(em == null) return "EM NULL"; 
        //checks if EntityManager was found
        administratordata ad = em.find(administratordata.class, new Long(3));
        //tries to find a instance of administrator data in the data base
        if(ad == null){
            return "notfound"; //return not found if there is none
        } else{
            return ad.getNotesJSON(); //return the JSON information if there is.
        }
    }

    /**
     * PUT method for updating or creating an instance of AministratorSaveResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
        if(em == null) return; // verifies if entity manager exists
        administratordata ad = em.find(administratordata.class, new Long(3));
        //finds our administratordata in the JDBC and checks if it exists
        if(ad == null){
            ad = new administratordata(); 
            //creates instance if it doesn't already exist
            ad.setId(new Long(3));
            System.out.println("BEFORE PERSIST");
            em.persist(ad);
            System.out.println("CREATED ENTRY");
           // em.find(administratordata, new Long(3));
        }
        ad.setNotesJSON(content); //saves the JSON string
        em.merge(ad); //commits the changes!!!
    }
}
